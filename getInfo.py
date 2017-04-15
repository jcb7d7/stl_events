#!/usr/bin/python

import requests
import json
import time
import mysql.connector
import sys

#r = requests.get('https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&lat=38.6270&long=-90.1994&radius=50&units=miles&apikey=CxKxjPph8rtLSn1bjdtF3A3BVkkmIAzm')

cnx = mysql.connector.connect(user='root', password='events',
                              host='127.0.0.1',
                              database='events')


cursor = cnx.cursor()

r = requests.get('https://app.ticketmaster.com/discovery/v2/events.json?stateCode=MO&city=St.%20Louis&apikey=CxKxjPph8rtLSn1bjdtF3A3BVkkmIAzm')
#r = requests.get('https://app.ticketmaster.com/discovery/v2/events.json?startDateTime=2017-03-13T00:00:00Z&endDateTime=2017-03-16T00:00:00Z&stateCode=MO&city=St.%20Louis&apikey=CxKxjPph8rtLSn1bjdtF3A3BVkkmIAzm')

data = json.loads(r.text)

print 'TicketMaster'
for i in data['_embedded']['events']:
	try:
#		print  i['id'], i['name'], i['dates']['start']['localDate'], i['dates']['start']['localTime'], i['classifications'][0]['segment']['name'], i['_embedded']['venues'][0]['name'], i['url'], i['images'][0]['url']

		add_tc_event = ("replace INTO ticket_master "
               "(id, name, date, time, type, place, link, img) "
               "VALUES (%s, %s, %s, %s, %s, %s, %s, %s)")

		tc_event_data = (i['id'], \
                         i['name'], \
                         i['dates']['start']['localDate'], \
                         i['dates']['start']['localTime'], \
                         i['classifications'][0]['segment']['name'], \
                         i['_embedded']['venues'][0]['name'], \
                         i['url'], \
                         i['images'][0]['url'])

		cursor.execute(add_tc_event, tc_event_data)
		cnx.commit()

	except Exception as ex:
		print ex
		continue


print '\n\nMeetup'
r = requests.get('http://api.meetup.com/find/events?sign=true&key=5a411d17661b5877c3f871306a1bc')
data = json.loads(r.text)
for i in data:
	try:
		print i['id'], i['name'], time.strftime('%Y-%m-%d', time.localtime(i['time'] / 1000)), time.strftime('%H:%M:%S', time.localtime(i['time'] / 1000)), i['group']['lat'], i['group']['lon'], i['group']['name'], i['link']

		add_mu_event = ("replace INTO meetup "
               "(id, name, date, time, lat, lon, group_name, link) "
               "VALUES (%s, %s, %s, %s, %s, %s, %s, %s)")
		
		mu_event_data =  (i['id'], \
                                  i['name'], \
                                  time.strftime('%Y-%m-%d', time.localtime(i['time'] / 1000)), \
                                  time.strftime('%H:%M:%S', time.localtime(i['time'] / 1000)), \
                                  i['group']['lat'], \
                                  i['group']['lon'], \
                                  i['group']['name'], \
                                  i['link'])

		cursor.execute(add_mu_event, mu_event_data)
		cnx.commit()

	except Exception as ex:
		print ex
		continue
		

cursor.close()
cnx.close()

'''

r = requests.get('http://api.eventful.com/json/events/search?app_key=5TmGn9z89FBPs6MK&where=38.6270,-90.1994&within=25')

data = json.loads(r.text)
for i in data['events']['event']:
	print i.keys()
'''

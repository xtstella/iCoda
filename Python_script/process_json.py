import json
import re
from datetime import datetime

filename = 'maritime.bulkjson'
data = []

pub_UID = 0
pub_id_array = []

def publicationUID(pub_id):
	global pub_UID
	global pub_id_array
	
	if pub_id not in pub_id_array:
		pub_id_array.append(pub_id)
		pub_UID = pub_UID + 1
		return pub_UID - 1
	else:
		return pub_id.index(pub_id_array);

def personObject(personneAnnotations):
	person_names = []
	personneLength = 0
	
	for p in personneAnnotations:
		if p['forme'] not in person_names:
			person_names.append(p['forme'])
			personneLength = personneLength + 1
	return person_names

def locationObject(lieuAnnotations):
	locationLength = 0
	location_names = []
	
	for locat in lieuAnnotations:
		if locat['forme'] not in location_names:
			location_names.append(locat['forme'])
			locationLength = locationLength + 1
	return location_names

#		if locat['forme'] not in location_names:
#			location_names.append(locat['forme'])
#			locationLength = locationLength + 1
#	location.append({
#		'location_names_Number': locationLength,
#		'location_names': location_names
#	})
#	return location

def dealing_declinaisons(declinaisons):
	declinaisons = declinaisons[0]
	analyse = declinaisons['analyse']
	
	personneAnnotations = analyse['personneAnnotations']
	lieuAnnotations = analyse['lieuAnnotations']
	person_names = personObject(personneAnnotations)
	location_names = locationObject(lieuAnnotations)
			
	diffusion = declinaisons['diffusion']
	sites = diffusion['sites']
	url = []
	for s in sites:
		u= sites[0]['url']
		url.append(u)

	toadd = {  
				'id': UID,
				'fulltime': datetimr_str,
				'date': date,
				'time': time,
				'person_names': person_names,
				'location_names': location_names,
				'url': url
			}
	return toadd


with open(filename,'r') as file_to_read:

	for line in file_to_read:
		d = json.loads(line)
		
		datetimr_str = d['date']
		datetime_object = datetime.strptime(datetimr_str, '%Y-%m-%dT%H:%M:%S')
		year = datetime.strptime(datetime_object, '%Y')
		if year <= 2017:
			break
			
		date = datetime.strftime(datetime_object, "%d/%m/%y")
		time = datetime.strftime(datetime_object, "%H:%M:%S")
		print(date)
		
		publication_id = d['id']
		UID = publicationUID(publication_id)
		# geographie = d['geographie']
		declinaisons = d['declinaisons']
		# if (len(declinaisons) == 2 ):
		toadd = dealing_declinaisons(declinaisons)
		data.append(toadd)
		
		# elif (len(declinaisons) > 1):
		# 	print(len(declinaisons))
		# 	print (declinaisons)


with open('data.json', 'w') as outfile:
	json.dump(data, outfile)



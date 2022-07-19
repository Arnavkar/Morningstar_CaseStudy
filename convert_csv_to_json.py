import json
import csv
import sys

def extract_data_from_csv(path):
	output = []
	with open(path, 'r') as fp:
		reader = csv.reader(fp)
		headerRow = reader.__next__()
		headerRow = [header.lower() for header in headerRow]

		for row in reader:
			row_output = {}
			for idx,val in enumerate(row):
					row_output[headerRow[idx]] = row[idx]
			output.append(row_output)

		print(output)
		return output

def write_to_json(path,jsonOutput):
	with open('news.json','w') as fp:
		fp.write(json.dumps(jsonOutput,indent=1))

        	
if __name__ == '__main__':
	jsonOutput = extract_data_from_csv(sys.argv[1])
	write_to_json(sys.argv[1],jsonOutput)
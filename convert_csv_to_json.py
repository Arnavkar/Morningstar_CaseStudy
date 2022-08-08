import json
import csv
import sys

def extract_data_from_csv(path):
	output = []
	with open(path, 'r', encoding='utf-8-sig') as fp:
		reader = csv.reader(fp)
		headerRow = reader.__next__()
		headerRow = [header.lower().strip() for header in headerRow]

		for idx,row in enumerate(reader):
			row_output = {}
			row_output["id"] = idx
			for idx,val in enumerate(row):
					if headerRow[idx] in ["day","credibility"]:
						row_output[headerRow[idx]] = row[idx]
					else:
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
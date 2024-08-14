# Author: Rhythm
# Backend Challenge
## 1. Day 1

We expect you to develop a service that provides an API using _REST_ or _GraphQL_ that implements the three following features and respects the following technical requirements:

### 1.1. Create a partner:
Save in a database a partner defined by **all** the fields represented by the JSON and rules below:
```json
{
  "id": 1, 
  "tradingName": "Adega da Cerveja - Pinheiros",
  "ownerName": "Zé da Silva",
  "document": "1432132123891/0001",
  "coverageArea": { 
    "type": "MultiPolygon", 
    "coordinates": [
      [[[30, 20], [45, 40], [10, 40], [30, 20]]], 
      [[[15, 5], [40, 10], [10, 20], [5, 10], [15, 5]]]
    ]
  },
  "address": { 
    "type": "Point",
    "coordinates": [-46.57421, -21.785741]
  }
}
```

1. The `address` field follows the `GeoJSON Point` format (https://en.wikipedia.org/wiki/GeoJSON);
2. The `coverageArea` field follows the `GeoJSON MultiPolygon` format (https://en.wikipedia.org/wiki/GeoJSON);
3. The `document` must be a unique field;
4. The `id` must be a unique field, but not necessarily an integer;

Below, you can have a look at how these partners might be represented in a map:
![Partners in map](files/images/pdvs.png)

### 1.2. Load partner by id:
Return a specific partner by its `id` with all the fields presented above.

### 1.3. Search partner:
Given a specific location (coordinates `long` and `lat`), search the **nearest** partner **which the coverage area includes** the location.

## Day 2:
A student, in order to save expenses and control his personal finances, decided to develop an application to help him with this mission. After a case study, he mapped the following features:

1. Creation of movement (income and expenses);
2. Movement update;
3. Exclusion of movement;
4. List of movements;
5. Balance display.

### Junior Developer
1. Filter the list of transactions by date (start date and end date);
2. Pagination in the list of transactions.
### Full Developer
1. All Junior requirements;
2. Semantic Rest API (if you chose to develop a Rest API);
3. Minimally scalable architecture;
4. Minimum coverage of automated tests.
### Senior Developer
1. All Plenum requirements;
2. Authentication:
3. User registration;
4. Login;
5. The user needs to be authenticated to carry out the activities mentioned in the context.
6. Dockerize the application;
7. Good OOP practices (Examples: SOLID, Design Patterns, etc.).


Good luck!

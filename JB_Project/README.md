# FileSearch
#### FileSearch is a Windows console application that searches files on the hard disk, records the search attempts and search results to a Msql database


# Workflow
  - The app prompts the user to enter filename or its fragment that he wishes to search
  - Next, the app prompts the user to enter root directory the search will be performed.
  - Optionally, the user can hit Enter to search in the default directory (C drive)
  - The search attempt is recorded to the database
  - As an output, user receives a list of files with the full path. The search results appear one-by-one as soon as they are found. Each search result is recorded to the database
  - After the search is done, user can choose to either run another search or quit.

# Error handling
 - In case of invalid search pattern or root folder path, user is prompted to repeate the input untill they give a correct value.
 - Max lenght of a search fragment is limited to 20 chars
 - Max lenght of a root folder file path is limited to 257 chars
 - The user receives "No files found message" in case the search is complete but no files were found
 - The user receives "Error + Exception text" message in case the search was aborted for any reason

# Database side
- Every search attempt is recorded to SearchRequests table. It has the following columns: SearchRequestId (PK), SearchString, SearchRootDirectory, IsComplete. One search attempt is one row.
- Every result is recorded to SearchResults table with the following columns: SearchResultId (PK), SearchRequestId(FK), SearchResultText. Each search attempt can have several results.
- We use stored procedures to record data to DB.
- If the search ran to the end without errors, we update the SearchRequests table record with IsComplete = 1. 

# Test cases
- Basic flow: Type in existing filename and a lower level folder ("Flower", "D:\TestFolder")
- In basic flow, check the attempt and results record in DB
- Hit enter instead of typing in the search pattern
- Type in search pattern longer than 20 characters
- Hit enter instead when prompted for search root folder
- Enter non-existing filename
- Enter non-existing folder name
- Enter path longer than 257 chars

-- CREATE DB

USE master
GO
CREATE DATABASE ProjectDb
GO


-- CREATE TABLES
-- Root directory path is max allowed by Directory.EnumerateFiles

USE ProjectDb
CREATE TABLE [dbo].[SearchRequests] (
	[SearchRequestId] INT IDENTITY (1,1) NOT NULL,
    [SearchString] NVARCHAR (20)  NOT NULL, 
	[SearchRootDirectory] NVARCHAR (257),
	[IsComplete] INT NOT NULL
    CONSTRAINT [PK_SearchRequestId] PRIMARY KEY ([SearchRequestId])
);
GO


use ProjectDb
CREATE TABLE [dbo].[SearchResults] (
    [SearchResultId]   INT IDENTITY (1, 1) NOT NULL, 
	[SearchRequestId] INT NOT NULL,
	[SearchResultText] NVARCHAR(280)
    CONSTRAINT [PK_SearchResultId] PRIMARY KEY ([SearchResultId])
	CONSTRAINT [FK_SearchRequestId] FOREIGN KEY ([SearchRequestId]) 
		REFERENCES [dbo].[SearchRequests]([SearchRequestId])
);
GO

 
-- CREATE SP

use [ProjectDb]
GO
CREATE PROCEDURE InsertNewSearch
		@searchString NVARCHAR(20),
		@searchRootDirectory NVARCHAR(257),
		@isComplete INT,
		@identity INT OUT
AS
	INSERT INTO SearchRequests(SearchString, SearchRootDirectory, IsComplete)
	VALUES (@searchString, @searchRootDirectory, @isComplete)
	SET @identity = SCOPE_IDENTITY()  
GO



USE [ProjectDb]
GO
CREATE PROCEDURE UpdateSearchStatus
       @isComplete INT,
	   @searchRequestId INT
  AS
    BEGIN
		UPDATE SearchRequests
		SET IsComplete = @isComplete
		WHERE SearchRequestId = @searchRequestId
    END
GO




USE [ProjectDb]
GO
CREATE PROCEDURE InsertSearchResult
		@searchRequestId INT,
		@searchResultText NVARCHAR(280)
AS
	INSERT INTO SearchResults(SearchRequestId, SearchResultText) VALUES (@searchRequestId, @searchResultText)
GO







# Agenda de compromissos
A aplicação foi construída em 3 módulos, sendo eles:
- API (.NET Core 2.2)
- APP (Angular 8)
- Banco de Dados (SQL Server 2017)

## Instruções para teste
- Solução em Docker: Em desenvolvimento...

Enquanto a solução em Docker não é finalizada, utilize as seguintes instruções:

- Banco de dados
Rodar os seguintes scripts dentro da sua base de dados:
```
-- Script de criação da base de dados
CREATE DATABASE dbSchedule
GO
USE dbSchedule
CREATE TABLE [dbo].[Schedule](
  [Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
  [PatientName] [varchar](255) NOT NULL,
  [PatientBirth] [date] NULL,
  [Start] [date] NULL,
  [Finish] [date] NULL,
  [Notes] [nvarchar](max) NULL
)
GO

-- Script de criação da tabela
CREATE TABLE [dbo].[Schedule]([Id] [int] IDENTITY(1,1) NOT NULL,[PatientName] [varchar](255) NOT NULL,[PatientBirth] [date] NULL,[Start] [date] NULL,[Finish] [date] NULL,[Notes] [nvarchar](max) NULL)
GO
```

- API
Rodar os seguintes comandos abaixo (de dentro da pasta `api`):
```
$ dotnet restore
$ dotnet run
```

- APP
Rodar os seguintes comandos abaixo (de dentro da pasta `app`):
```
$ npm install
$ npm start
```

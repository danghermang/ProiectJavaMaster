USE [YusoDev]
GO

/****** Object:  Table [dbo].[Auctions]    Script Date: 16/01/2021 15:00:00 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Auctions](
	[Id] [uniqueidentifier] NOT NULL,
	[Name] [nvarchar](max) NULL,
	[Status] [int] NOT NULL,
	[UserId] [uniqueidentifier] NOT NULL,
	[FromAddress_City] [nvarchar](max) NULL,
	[FromAddress_PostalCode] [nvarchar](max) NULL,
	[FromAddress_Street] [nvarchar](max) NULL,
	[ToAddress_City] [nvarchar](max) NULL,
	[ToAddress_PostalCode] [nvarchar](max) NULL,
	[ToAddress_Street] [nvarchar](max) NULL,
	[AuctionDate_DateCreated] [datetime2](7) NOT NULL,
	[AuctionDate_EndDate] [datetime2](7) NOT NULL,
	[Location_DeliveryGeo] [nvarchar](max) NULL,
	[Location_PickupGeo] [nvarchar](max) NULL,
	[TransactionDate_DeliverOnDate] [datetime2](7) NOT NULL,
	[TransactionDate_PickupOnDate] [datetime2](7) NOT NULL,
	[Details_AditionalInformation] [nvarchar](max) NULL,
	[Details_Distance] [real] NOT NULL,
	[Details_Weight] [real] NOT NULL,
	[WinnerId] [uniqueidentifier] NULL,
 CONSTRAINT [PK_Auctions] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[Auctions] ADD  DEFAULT (CONVERT([real],(0))) FOR [Details_Distance]
GO

ALTER TABLE [dbo].[Auctions] ADD  DEFAULT (CONVERT([real],(0))) FOR [Details_Weight]
GO

ALTER TABLE [dbo].[Auctions]  WITH CHECK ADD  CONSTRAINT [FK_Auctions_Users_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([Id])
ON DELETE CASCADE
GO

ALTER TABLE [dbo].[Auctions] CHECK CONSTRAINT [FK_Auctions_Users_UserId]
GO



USE [YusoDev]
GO

/****** Object:  Table [dbo].[Bids]    Script Date: 16/01/2021 15:01:01 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Bids](
	[Id] [uniqueidentifier] NOT NULL,
	[AuctionId] [uniqueidentifier] NOT NULL,
	[BidDate] [datetime2](7) NOT NULL,
	[Price] [int] NOT NULL,
	[UserId] [uniqueidentifier] NOT NULL,
 CONSTRAINT [PK_Bids] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Bids]  WITH CHECK ADD  CONSTRAINT [FK_Bids_Auctions_AuctionId] FOREIGN KEY([AuctionId])
REFERENCES [dbo].[Auctions] ([Id])
ON DELETE CASCADE
GO

ALTER TABLE [dbo].[Bids] CHECK CONSTRAINT [FK_Bids_Auctions_AuctionId]
GO



USE [YusoDev]
GO

/****** Object:  Table [dbo].[Avatars]    Script Date: 16/01/2021 15:00:46 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Avatars](
	[UserId] [uniqueidentifier] NOT NULL,
	[Image] [varbinary](max) NULL,
 CONSTRAINT [PK_Avatars] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[Avatars]  WITH CHECK ADD  CONSTRAINT [FK_Avatars_Users_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([Id])
ON DELETE CASCADE
GO

ALTER TABLE [dbo].[Avatars] CHECK CONSTRAINT [FK_Avatars_Users_UserId]
GO



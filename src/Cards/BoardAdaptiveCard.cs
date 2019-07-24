namespace CoreBot.Cards
{
	using AdaptiveCards;
	using CoreBot.Models;
	using System;
	using System.Collections.Generic;
	using System.Linq;
	using System.Threading.Tasks;

	/// <summary>
	/// Adaptive Card Model for the Board.
	/// </summary>
	public class BoardAdaptiveCard
	{
		Board board = new Board();

		public static string GetBoardAdaptiveCard(Board board)
		{
			var adaptiveCard = new AdaptiveCard("1.0")
			{
				Body = new List<AdaptiveElement>()
			};

			var textBlock = new AdaptiveTextBlock()
			{
				Text = "Player's Turn",
				HorizontalAlignment = AdaptiveHorizontalAlignment.Center,
				Size = AdaptiveTextSize.Large,
				Spacing = AdaptiveSpacing.Small
			};

			for (var i=0; i<3; i++)
			{
				var columnSet = new AdaptiveColumnSet()
				{
					Separator = false,
				};

				for (var j=0; j<3; j++)
				{
					columnSet.Columns.Add(new AdaptiveColumn()
					{
						Width = AdaptiveColumnWidth.Stretch,
						Items = new List<AdaptiveElement>()
						{
							new AdaptiveImage()
							{
								AltText = "",
								Url = new Uri(board.getCDN(board.getCellState(j))),
								Size = AdaptiveImageSize.Medium,
							}
						}
					});
				}
			}

			return null;
		}
	}
}

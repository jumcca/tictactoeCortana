// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

using System.Collections.Generic;

namespace CoreBot.Models
{
    public class Board
    {
        public enum CellState
		{
			BLANK,
			X,
			O,
			ERROR
		}

        private CellState[] boardState { get; set; }

        private string[] playerNames { get; set; }

		private Dictionary<CellState, string> iconCDN { get; set; }

		public Board()
		{
			boardState = new CellState[9];
			playerNames = new string[] { "Player 1", "Player 2" };
			iconCDN = new Dictionary<CellState, string>
			{
				{ CellState.BLANK, "" },
				{ CellState.X, "" },
				{ CellState.O, "" },
				{ CellState.ERROR, "" }
			};
		}

		public bool setCellState(int index, CellState state)
		{
			if(validIndex(index))
			{
				boardState[index] = state;
				return true;
			}

			return false;
		}

		public CellState getCellState(int index)
		{
			if(validIndex(index))
			{
				return boardState[index];
			}

			return CellState.ERROR;
		}

		public string getCDN(CellState state)
		{
			return iconCDN[state];
		}

		private bool validIndex(int index)
		{
			if (index >= 0 && index <= 8)
			{
				return true;
			}

			return false;
		}
	}
}

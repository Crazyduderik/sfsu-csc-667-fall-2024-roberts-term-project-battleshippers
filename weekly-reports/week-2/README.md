Group F 
Meera Shiroya
Erik Perez 
Angelo Arriaga
Rathang Pandit 

                                                              Week 2 Report 


Link to repository 
https://github.com/Crazyduderik/sfsu-csc-667-fall-2024-roberts-term-project-battleshippers


Link to GitHub Project Board 
https://github.com/users/Crazyduderik/projects/1



What was Accomplish 
Setting up the code and testing
Creating a diagram of our data base
Talked about what functionality we wanted to add 
Discussed File Structure 
Created a project board 






















Database Data & Description:


Registered Player Table:
PK: PlayerID
Each registered user will have a unique identifying playerID
FK: AccountID
The AccountID of each registered user will reference their account in the account table

Account Table:
PK: Account
Each registered user has a unique account id that represents their account
Password
Store an encrypted password which is done via Bcrypt 
Username
Unique username for each player
Avatar Type
Each player has 4 options for an avatar, and the the database stores the corresponding number
Wins
Integer value that keeps track of the player’s win 
Game 
Integer value that keeps track of the total number of games played (wins and losses)

Match History Table:
PK: HistoryID
Unique id of each game completed
Players
Corresponds to the player ids of the players involved in the game
PlayerMoves
Stores each player’s move as a long sequence eg: (‘A5 C6 G7’) 










Game Data in Memory & Description:

Game Board:
	The game board will show a 2 by 2 cell to each player with their ships on it, and this is in memory because each game, the board will look different depending on the placements of the person’s ships. So it seems to be wasteful to add all this into the database. 


Ships: 
We decided to keep ships in memory, because everytime a player has his turn to choose a place to hit, if the ships were stored in memory we would have to query it to update if the ship was hit or not and each game the position of the ships would change depending on the player's placement. That’s why we have ships in memory, so we can easily manipulate and check the data. This is one of the reasons we have match history in the db, that stores each player's moves in each game.
Each ship will share the following characteristics: each ship will have a ship id, a string for the ship name, the start positionX in the X-coordinate system and the start positionY in the Y-coordinate system. The X and Y int represents the start position of each ship. Each ship will also have an orientation, which will be vertical or horizontal.  The boolean isSunk will show the status of the ship if the ship has sunk or hasn’t. Each ship will also have a length, and the number of hits it has received. The ship’s hits and sunk status is calculated based on the fact that if the ship is hit at the (X,Y) position and anywhere between that point to the position between (X + length or Y + length) depending on the orientation of the ship vertical or horizontal. If the number of hits is equal to the length, the ship’s status is considered to be sunk and all this is possible by ensuring that the same position can’t be targeted again.  


Real-Time Chat: (I am not sure here if we need the id stuff since it’s a real-time chat)?
 	In memory we have real-time chats similar to zoom. The benefit of this is messages can be handled by clients and the server forgets all. The real-time chat is obviously going to be handled by each player having their designated player-id and each message having a unique message-id.







# (Match) Maker

## Proposed Level of Achievement
Apollo 11

Done by: Hung Eu Leon & Lai Yuen Sheng

## Motivation
COVID-19 has made it especially difficult for students to make new friends in NUS, and consequently, more difficult for them to find their “kakis” to engage in sports with. With social activities curtailed, many students don’t have many opportunities to build connections in university, much less meet people with similar interests. Sports, being built upon the premise of having a community with shared interest, have thus been made inaccessible for many. (Match) Maker therefore helps to provide users with a large network of fellow sports enthusiasts whom they can meet and engage in sports activities with through the app.

Looking beyond COVID-19, (Match) Maker will also be a platform to facilitate enjoyable and casual sports activities, lowering the barriers to entry and motivating the pursuance of sports among NUS students — circumventing traditional obstacles in casual sports games like insufficient players, fear of skills mismatch and even logistics constraints. On top of that, students get to utilise this platform to forge meaningful friendships which can extend outside the realm of sports.

## Aim
We hope to be a convenient and accessible intermediary platform where sports matches are set up for people based on sports interests and skill levels, ultimately motivating the pursuance of sports.

## User Stories
1. As a sports enthusiast, I would want to be able to set up/find games within NUS based on defined parameters (ie. sports interests and skill levels)
2. As a student who wishes to pick up a new sport, I would want to be able to find fellow beginners to play with. 
3. As an administrator who wants to prevent abuse of the system, I should be able to identify users guilty of “no-show” or verbal abuse in the in-built chat function, warn them or even ban them if they continue to be disruptive. 

## Features and Timeline
| <img height="300" src="https://github.com/euleonnnn/matchmakers/blob/master/readimg/Telegram.png"/>|<img height="300" src="https://github.com/euleonnnn/matchmakers/blob/master/readimg/logo.png" />| 
|---|---|
|Telegram Bot will remind users of upcoming matches, and provide updates on available slots for sports users have shown interests in.| A Mobile Web App where users have their own profile and credentials, and can set up or join a game. Mobile Web App will have a chat function for users participating in the same game to communicate with one another before and after the game. |

### Features completed 
1. Mobile Web App
  - Allow users to sign up and log in to the web app
  - Create and update their own profile on the platform
  - Allow finding and adding of friends

### Features to be completed by Milestone 2
1. Game Creation  
  - Allow users to create games and await for slots to be filled 
  - Show list of available games over the next few days and allow users to join games and fill up slots
  - Allow the booking of NUS facilities should a game be set up 
2. Chat function
  - Facilitate communications between players before and after games     
3. Telegram bot to remind users of upcoming matches

### Features to be completed by Milestone 3
1. Machine learning to provide recommendations based on sports interests, match histories and friends list.
2. Natural Language Processing to sieve out verbal abuse in in-built chat function.
3. Search algorithm ranks results based on search history, location proximity and "friends" who are also participating in the
same game.

## Differences from Existing Platforms
| (Match) Maker | Resource Booking System (REBOKS) |
| --- | --- |
| Users can either invite their friends or book the facilities and allow other interested users they may not know of to join their game | Users have to find players through their own means, be it a friend or an acquaintance |
| Users can interact and meet other players who they do not have prior any connections with by creating or joining games | Conventionally, users will usually find friends or acquaintances to play with them, meeting new people is a rare occasion |
| Users can expect to be reminded of their upcoming matches as they subscribe to the Telegram bot | Users will have to remember their own bookings by themselves |
| Essentially a one-stop platform for sports activities, from (logistics) arrangement to the actualisation | Barriers to entry for sports activities remain high for students who do not have friends with similar interests or experience levels |

## Demo
| Sign In | Create Profile | Create Game |
| --- | --- | --- |
| <img height="400" width="230" src="https://github.com/euleonnnn/matchmakers/blob/master/readimg/signup.PNG" /> | <img height="400" width="230" src ="https://github.com/euleonnnn/matchmakers/blob/master/readimg/profile.PNG" /> | <img height="400" width="230" src="https://github.com/euleonnnn/matchmakers/blob/master/readimg/creategame.PNG" /> |

|Book Facilities | Chat and Prepare | Join a Game |
| --- | --- | --- |
| <img height="400" width="230" src="https://github.com/euleonnnn/matchmakers/blob/master/readimg/booking.PNG" /> | <img height="400" width="230" src="https://github.com/euleonnnn/matchmakers/blob/master/readimg/chat.PNG" /> | <img height="400" width="230" src="https://github.com/euleonnnn/matchmakers/blob/master/readimg/joingame.PNG" /> |

## Program Flow
<img src="https://github.com/euleonnnn/matchmakers/blob/master/readimg/Progflow.PNG" />

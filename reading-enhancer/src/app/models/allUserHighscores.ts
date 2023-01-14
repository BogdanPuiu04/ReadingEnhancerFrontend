export interface AllUserHighScores {
  users: UserHighScore[]
}


export interface UserHighScore {
  name: string,
  highScore: number,
  readingSpeed: number
}

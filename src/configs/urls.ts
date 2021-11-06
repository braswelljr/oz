/**
  ## Trending supported params
  'https://api.themoviedb.org/3//trending/<<media_type>>/<<time>>?api_key=<<api_key>>&page=<<page_number>>'

  | Media Type	   | Description
  |----------------|----------------------------------------------------------------------------------|
  | all	           | Include all movies, TV shows and people in the results as a global trending list.|
  | movie	         | Show the trending movies in the results.                                         |
  | tv	           | Show the trending TV shows in the results.                                       |
  | person	       | Show the trending people in the results.                                         |


  ##
  | Time      | Window	Description                  |
  |-----------|--------------------------------------|
  | day	      | View the trending list for the day.  |
  | week	    | View the trending list for the week. |
 */
export const trending = 'https://api.themoviedb.org/3/trending'

/**
 ## API Supported Image Sizes
  'https://image.tmdb.org/t/p/<image_type>'

  |  poster  | backdrop |  still   | profile  |   logo   |
  | :------: | :------: | :------: | :------: | :------: |
  | -------- | -------- | -------- |    w45   |    w45   |
  |    w92   | -------- |    w92   | -------- |    w92   |
  |   w154   | -------- | -------- | -------- |   w154   |
  |   w185   | -------- |   w185   |   w185   |   w185   |
  | -------- |   w300   |   w300   | -------- |   w300   |
  |   w342   | -------- | -------- | -------- | -------- |
  |   w500   | -------- | -------- | -------- |   w500   |
  | -------- | -------- | -------- |   h632   | -------- |
  |   w780   |   w780   | -------- | -------- | -------- |
  | -------- |  w1280   | -------- | -------- | -------- |
  | original | original | original | original | original |
  */
export const image = 'https://image.tmdb.org/t/p'

/**
 https://api.themoviedb.org/3/movie/<movie_id>
 */
export const movie = 'https://api.themoviedb.org/3/movie'

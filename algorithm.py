#           director, actor, genre, keyword     sum always = 300
weighting = [20,      20,    20,    240     ]


# following is the algorithm for choosing the next movie
test = movieList['Harry Potter and the Half-Blood Prince']  # user can query the movie

scoreList = dict()
for (k, v) in  test.items():
    s = 0
    s += v['director_sim'] * weighting[0]
    s += v['actors_sim'] * weighting[1]
    s += v['genre_sim'] * weighting[2]
    s += v['keywords_sim'] * weighting[3]
    scoreList[k] = s

res = sorted(scoreList.items(), key=lambda kv: kv[1], reverse=True)

res[:10] # return the top ten movies

# the average similarity for the querying movie to other movies
# already store in database (sim_avg)
n_dir = sum([x['director_sim'] for x in test.values()]) / len(test)
n_act = sum([x['actors_sim'] for x in test.values()]) / len(test)
n_gen = sum([x['genre_sim'] for x in test.values()]) / len(test)
n_key = sum([x['keywords_sim'] for x in test.values()]) / len(test)

# user can choose the next movie
choose = 'Oz: The Great and Powerful'
test[choose]

# calculate the updating value with normalization
# updating value = sqrt(next sim / average sim)
a_dir = math.sqrt(test[choose]['director_sim'] / n_dir)
a_act = math.sqrt(test[choose]['actors_sim'] / n_act)
a_gen = math.sqrt(test[choose]['genre_sim'] / n_gen)
a_key = math.sqrt(test[choose]['keywords_sim'] / n_key)
updating = [a_dir, a_act, a_gen, a_key]

# update the original weighting vector, and keep its sum = 300
new_weighting = [x + y for x, y in zip(weighting, updating)]
weighting = [x * 300 / (300 + sum(updating)) for x in new_weighting]

print(weighting)

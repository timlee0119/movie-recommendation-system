# A Movie Recommender System based on Okapi BM25
## Tech stack
- MERN (MongoDB, Express, React, Node) for web application
- Python for algorithm simulation and data crawling

## Introduction

Everyone has a different taste in movies.
After we watched a fascinating movie, we
always want to search for similar movies
that could also touch us. However, each
audience may be touched by different parts
of the movie. Someone may like the plot,
while someone may like the actors.
Therefore, we try to design a movie
recommendation system based on user
preference.

## Related work

There are plenty of ways to design the
movie recommendation system. One is to
focus on user ratings of the movies.[1]
However, this way may recommend
“good” movies but not the most relevant
movies. One is to focus on the behavior of
users.[2] This way would be also
problematic because although some
movies are quite relevant their quality
is terrible. The other one can be
recommended according to different users
by using the latent factor model.[3] The
advantage of this method is that it can find
a movie that may meet the appetite of the
current user based on the ratings of many
users. However, once the information of
the user is quite messy, it is difficult to
verify the effectiveness of "different
users". Furthermore, the appetite of others
may not be the same as the user’s and
may be recommended to completely
irrelevant movies.

The last one combines
the second one and the third one. This way
would take the advantage of both methods.
It uses the second method to sort out a
number of high similarity movies, and then
sort by the third method to recommend
movie with a higher order. Therefore, it
would recommend movies that “users may
like and have similar similarities”.

## Methodology

We decided to let users dynamically adjust
the recommendations based on their every
action. We use a database with 5,000
movies to record basic information about
each movie. The method we implement is
similar to Content-Based Recommender.
Instead of mixing all the information
together, we calculate the Okapi BM25 score
of the director, actors, genre, plot
keywords, and then calculate the total by
specific weight from the user.

Every time a
user clicks, we treat it as a “recommended
success”, and then update the weighting
vector of the user. The initial value of the
weighting vector of every user is [40, 40,
40, 180], which represents the weight of
the director, actors, genre, and keywords,
and each time the weight is updated, we
will adjust the weighting vector to a total
of 300.

<a href="https://www.codecogs.com/eqnedit.php?latex={\text{score}}(D,Q)=\sum&space;_{i=1}^{n}{\text{IDF}}(q_{i})\cdot&space;{\frac&space;{f(q_{i},D)\cdot&space;(k_{1}&plus;1)}{f(q_{i},D)&plus;k_{1}\cdot&space;\left(1-b&plus;b\cdot&space;{\frac&space;{|D|}{\text{avgdl}}}\right)}}" target="_blank"><img src="https://latex.codecogs.com/gif.latex?{\text{score}}(D,Q)=\sum&space;_{i=1}^{n}{\text{IDF}}(q_{i})\cdot&space;{\frac&space;{f(q_{i},D)\cdot&space;(k_{1}&plus;1)}{f(q_{i},D)&plus;k_{1}\cdot&space;\left(1-b&plus;b\cdot&space;{\frac&space;{|D|}{\text{avgdl}}}\right)}}" title="{\text{score}}(D,Q)=\sum _{i=1}^{n}{\text{IDF}}(q_{i})\cdot {\frac {f(q_{i},D)\cdot (k_{1}+1)}{f(q_{i},D)+k_{1}\cdot \left(1-b+b\cdot {\frac {|D|}{\text{avgdl}}}\right)}}" /></a>

## Experiments

In the beginning, we have more
parameters in the weighting vector, the
title of the movie, the publishing company
and all actors in the movie. Titles may let
the sequel easier to recommend. However,
after several experiments, we found that
keywords, director, actors, and genre are
enough to keep the sequel at a high order.
The publishing company can be represented by
director and actors. The preference of a
user is usually influenced by a few actors
not all of them, so we only take the former
important actors as representatives in the
order.

The reason why the initial value of
keywords in the weighting vector are much
higher than others is because we
believe people who choose a movie by its
director, actors, or genre is a kind of
personal preference. Therefore, we
decided to recommend other movies by the
plot similarity at the beginning. However,
as the user continues to watch more
movies, we can find out whether the user
cares about “director, actors, genre”, and
then adjust the parameters to make the next recommendation more suitable. The
total of weighting vector decides the range
of the change in each adjustment. We
changed the number from 400 to 300 to
speed up.

## Conclusions

To fit each users’ preferences, we
improve the result by adjusting the weight
of the parameters. However, there are still
several ways to try. For example, we can
predict the rating of a movie by different
users’ ratings with the latent factor model. If
our project added the advantage of this method, we can surely recommend a
movie that more closely matches the user’s
appetite. Also, the initial value of the
weighting vector and the adjustment range
have yet to be verified by a large number
of experiments. Due to time constraints,
this time may not be able to adjust to the
most appropriate parameters, and
sometimes there will be cold boot
problems.

## References

[1] Zan Wang, Xue Yu, Nan Feng, and
Zhenhua Wang. An Improved Collaborative
Movie Recommendation System using
Computational Intelligence. 2014\
[2] Toine Bogers. Movie Recommendation
using Random Walks over the Contextual
Graph. 2010\
[3] Yashar Deldjoo, Mehdi Elahi, Paolo
Cremonesi. Using Visual Features and Latent
Factors for Movie Recommendation. 2016

const Posts = require('../dbmodules/posts');

module.exports.savePosts = function (post, res) {
    // Always create new instance while saving to mongodb
    const postsInstance = new Posts();
    postsInstance.userId = post.userId;  // set the posts name (comes from the request)
    postsInstance.title = post.title;
    postsInstance.comment = post.comment;
    // save the posts and check for errors
    postsInstance.save()
        .then(newpost => { res.send(newpost) })
        .catch(err => { console.log("err while saving", err); res.send(err) });
}

module.exports.getPosts = function (res) {
    // find all posts and check for errors
    Posts.find()
        .exec()
        .then(dataset => { res.send(dataset) })
        .catch(err => { console.log("err while saving", err); res.send(err) });
}

module.exports.getPostsById = function (userName, res) {
    // find posts by id  and check for errors
    Posts.find({ userId: userName })
        .exec()
        .then(dataset => { res.send(dataset) })
        .catch(err => { console.log("err while saving", err); res.send(err) });
}

module.exports.updatePostsById = function (userName, newPost, res) {
    const query = { userId: userName };
    console.log(query);
    // update posts by id  and check for errors
    Posts.update(query, newPost)
        .exec()
        .then(dataset => { res.send(dataset) })
        .catch(err => { console.log("err while saving", err); res.send(err) });
}
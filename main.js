function getUserProfile() {
const userId = document.getElementById('user-select').value;

      
fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
  .then(response => response.json())
  .then(user => {
          
   // document.getElementById('profile-image').src = `profile-image-${userId}.jpg`;
  document.getElementById('profile-name').innerText = user.name;
  document.getElementById('profile-username').innerText = `@${user.username}`;
            
  })
  .catch(error => {
      console.error('Error:', error);
  });

  fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    .then(response => response.json())
    .then(posts => {
      const postsContainer = document.getElementById('posts');
      postsContainer.innerHTML = '';

      posts.forEach(post => {
      const postElement = document.createElement('div');
      postElement.classList.add('post');
      postElement.innerHTML = `
                <div class="inside-img">
                <img class="post-image" src="https://www.shutterstock.com/image-vector/abstract-animal-art-free-vector-600w-1808845963.jpg" alt="Profile Image">
                </div>
                <div class="conte">
                <h3>${post.title}</h3>
                <p class="post-content">${post.body}</p>
                <button onclick="showComments(${post.id})"><img class="comment-icon" src="https://cdn-icons-png.flaticon.com/512/1380/1380338.png" alt=""></button>
                <button><img class="comment-icon" src="https://icons.veryicon.com/png/o/miscellaneous/mirror-icon/retweet-11.png" alt=""></button>
                <button><img class="comment-icon" src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Love_Heart_SVG.svg/800px-Love_Heart_SVG.svg.png" alt=""></button>
                <ul id="comments-${post.id}" class="comments"></ul>
                </div>
              `;

      postsContainer.appendChild(postElement);
      });
      })
    .catch(error => {
      console.error('Error:', error);
     });
}

function showComments(postId) {
  const commentsElement = document.getElementById(`comments-${postId}`);
  fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
  .then(response => response.json())
  .then(comments => {
            commentsElement.innerHTML = '';
            comments.forEach(comment => {
              const commentElement = document.createElement('li');
              commentElement.innerHTML = `
                <h4>${comment.name}</h4>
                <p>${comment.body}</p>
              `;
              commentsElement.appendChild(commentElement);
      });
            commentsElement.style.display = 'block';
      })
      .catch(error => {
      console.error('Error:', error);
      });
}
getUserProfile();
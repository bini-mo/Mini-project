document.addEventListener("DOMContentLoaded", () =>
{
    const commentForm = document.getElementById("commentForm");
    const commentsDisplay = document.getElementById("commentsDisplay");
    const postsContainer = document.getElementById("postsContainer");
    const charCountDisplay = document.getElementById("charCount");
    const maxChars = 200;


    // Handle form submission for comments
    commentForm.addEventListener("submit", (event) =>
    {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const comment = document.getElementById("comment").value;

        const commentDiv = document.createElement("div");

        commentDiv.classList.add("comment");
        commentDiv.innerHTML = `<strong>${username}</strong>: <p>${comment}</p> 
                                <div class="comment-actions"> 
                                    <button class="like-button"
                                       onClick="likeComment(this)">Like
                                       <span class="like-count">0</span>
                                    </button>
                                </div>`;

        
        commentsDisplay.appendChild(commentDiv);

        // Reset form fields
        commentForm.reset();

        charCountDisplay.innerText = `0/${maxChars}`;  
    });


       // Update character count
    document.getElementById("comment").addEventListener("input", (event) => 
    {
        const currentLength = event.target.value.length;
        charCountDisplay.innerText = `${currentLength}/${maxChars}`;
    });


      // Fetch blog posts from JSONPlaceholder
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(posts => {
        posts.forEach(post => {
            const postDiv = document.createElement("div");

            postDiv.classList.add("post");
            postDiv.innerHTML = `<h3>${post.title}</h3><p>${post.body}</p>`;

            postsContainer.appendChild(postDiv);
        });
    })
    .catch(error => console.error('Error fetching posts:', error));
});


    // Function to handle like button
function likeComment(button) {
    const likeCountSpan = button.querySelector(".like-count");
    let count = parseInt(likeCountSpan.innerText);
    likeCountSpan.innerText = count + 1;
}

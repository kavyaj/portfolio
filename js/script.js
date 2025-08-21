async function loadWritingPosts() {
    try {
        const response = await fetch('assets/data/posts.json');
        const data = await response.json();
        const posts = data.posts;

        const writingSection = document.getElementById('writing');
        if (!writingSection) return;

        // Clear existing posts to prevent duplicates if the function is called multiple times
        writingSection.innerHTML = '';

        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('post-entry');
            postElement.innerHTML = `
                <h3>${post.title}</h3>
                <p>${new Date(post.date).toLocaleDateString()}</p>
                <a href="blog-post.html?id=${post.id}">Read More</a>
            `;
            writingSection.appendChild(postElement);
        });
    } catch (error) {
        console.error("Failed to load writing posts:", error);
        const writingSection = document.getElementById('writing');
        if (writingSection) {
            writingSection.innerHTML = '<p>Error loading blog posts. Please try again later.</p>';
        }
    }
}

// Function to load a single blog post based on ID
async function loadBlogPost() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    if (!postId) {
        console.error("No post ID found in URL.");
        document.getElementById('blog-post-content').innerHTML = '<p>No blog post specified.</p>';
        return;
    }

    try {
        const response = await fetch('assets/data/posts.json');
        const data = await response.json();
        const post = data.posts.find(p => p.id === postId);

        if (!post) {
            console.error("Post not found:", postId);
            document.getElementById('blog-post-content').innerHTML = '<p>Blog post not found.</p>';
            return;
        }

        const blogPostContent = document.getElementById('blog-post-content');
        if (blogPostContent) {
            blogPostContent.innerHTML = `
                <h1>${post.title}</h1>
                <p class="post-meta">${new Date(post.date).toLocaleDateString()} by ${post.author || 'Anonymous'}</p>
                <div class="post-body">
                    ${post.content}
                </div>
            `;
        }

    } catch (error) {
        console.error("Failed to load blog post:", error);
        document.getElementById('blog-post-content').innerHTML = '<p>Error loading blog post. Please try again later.</p>';
    }
}

// Initial load functions based on the current page
document.addEventListener('DOMContentLoaded', () => {
    // Check if we are on the main portfolio page (or any page that needs the writing section)
    if (document.getElementById('writing')) {
        loadWritingPosts();
    }

    // Check if we are on a specific blog post page
    if (document.getElementById('blog-post-content')) {
        loadBlogPost();
    }
});
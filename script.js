
// ==========================================
// BLOG APPLICATION - JAVASCRIPT
// ==========================================


// 1. GET SAVED BLOGS
function getBlogs() {
    return JSON.parse(localStorage.getItem("blogs")) || [];
}


// 2. SAVE BLOGS
function saveBlogs(blogs) {
    localStorage.setItem("blogs", JSON.stringify(blogs));
}


// ==========================================
// 3. CREATE / PUBLISH BLOG
// ==========================================

const blogForm = document.getElementById("blogForm");

if (blogForm) {

    blogForm.addEventListener("submit", function(event) {

        event.preventDefault();

        // Get Form Values
        const title = document.getElementById("blogTitle").value.trim();
        const category = document.getElementById("blogCategory").value;
        const image = document.getElementById("blogImage").value.trim();
        const content = document.getElementById("blogContent").value.trim();

        // Validation
        if (!title || !category || !image || !content) {
            alert("Please fill all fields!");
            return;
        }

        // Create Blog Object
        const blog = {
            id: Date.now(),
            title: title,
            category: category,
            image: image,
            content: content,
            date: new Date().toLocaleDateString()
        };

        // Get Existing Blogs
        const blogs = getBlogs();

        // Add New Blog
        blogs.push(blog);

        // Save Blog
        saveBlogs(blogs);

        // Success Message
        alert("Blog Published Successfully!");

        // Reset Form
        blogForm.reset();

        // Go To Dashboard
        window.location.href = "dashboard.html";

    });

}


// ==========================================
// 4. DISPLAY BLOGS ON DASHBOARD
// ==========================================

const blogTableBody = document.getElementById("blogTableBody");

if (blogTableBody) {

    function displayBlogs() {

        const blogs = getBlogs();

        blogTableBody.innerHTML = "";

        // If No Blogs
        if (blogs.length === 0) {

            const row = document.createElement("tr");
            const cell = document.createElement("td");

            cell.colSpan = 4;
            cell.textContent = "No blogs published yet.";

            row.appendChild(cell);
            blogTableBody.appendChild(row);

            return;
        }

        // Show All Blogs
        blogs.forEach(function(blog) {

            const row = document.createElement("tr");

            // Blog Title
            const titleCell = document.createElement("td");
            titleCell.textContent = blog.title;

            // Blog Category
            const categoryCell = document.createElement("td");
            categoryCell.textContent = blog.category;

            // Blog Date
            const dateCell = document.createElement("td");
            dateCell.textContent = blog.date;

            // Delete Button
            const actionCell = document.createElement("td");

            const deleteButton = document.createElement("button");

            deleteButton.textContent = "Delete";
            deleteButton.className = "delete-btn";

            deleteButton.addEventListener("click", function() {
                deleteBlog(blog.id);
            });

            actionCell.appendChild(deleteButton);

            // Add Cells To Row
            row.appendChild(titleCell);
            row.appendChild(categoryCell);
            row.appendChild(dateCell);
            row.appendChild(actionCell);

            blogTableBody.appendChild(row);

        });

    }

    displayBlogs();

}


// ==========================================
// 5. DELETE BLOG
// ==========================================

function deleteBlog(id) {

    const confirmDelete = confirm("Are you sure you want to delete this blog?");

    if (confirmDelete) {

        let blogs = getBlogs();

        blogs = blogs.filter(function(blog) {
            return blog.id !== id;
        });

        saveBlogs(blogs);

        location.reload();

    }

}


// ==========================================
// 6. LOGOUT
// ==========================================

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", function() {

        const confirmLogout = confirm("Are you sure you want to logout?");

        if (confirmLogout) {

            window.location.href = "login.html";

        }

    });

}

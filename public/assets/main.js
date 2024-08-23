document.addEventListener('DOMContentLoaded', function() {
    const sortSelect = document.getElementById('sort-by');
    const searchBox = document.getElementById('search-box');
    const reviewsContainer = document.querySelector('.searching-contrs');

    if (!reviewsContainer) {
        console.error('Reviews container not found!');
        return;
    }

    console.log('Reviews container found:', reviewsContainer);

    // Function to filter reviews based on search input
    function filterReviews() {
        const query = searchBox.value.toLowerCase();
        console.log('Search query:', query);
        const reviews = reviewsContainer.querySelectorAll('.review-2');

        reviews.forEach(review => {
            const title = review.querySelector('.review-title').textContent.toLowerCase();
            const description = review.querySelector('.review-description').textContent.toLowerCase();
            
            console.log('Review title:', title);
            console.log('Review description:', description);

            if (title.includes(query) || description.includes(query)) {
                review.style.display = '';
                console.log('Showing review:', title);
            } else {
                review.style.display = 'none';
                console.log('Hiding review:', title);
            }
        });
    }

    // Function to handle sorting reviews
    function sortReviews() {
        const sortBy = sortSelect.value;
        console.log('Sorting by:', sortBy);
        const reviews = Array.from(reviewsContainer.querySelectorAll('.review-2'));

        reviews.forEach(review => {
            console.log('Review data:', {
                title: review.querySelector('.review-title').textContent,
                rating: review.querySelector('.stars').textContent,
                date: review.getAttribute('data-date')
            });
        });

        reviews.sort((a, b) => {
            let comparison = 0;
            if (sortBy === 'date') {
                // Sorting by date
                const dateA = new Date(a.getAttribute('data-date'));
                const dateB = new Date(b.getAttribute('data-date'));
                comparison = dateB - dateA;
            } else if (sortBy === 'rating') {
                // Sorting by rating
                const ratingA = parseInt(a.getAttribute('data-rating'), 10);
                const ratingB = parseInt(b.getAttribute('data-rating'), 10);
                comparison = ratingB - ratingA;
            } else if (sortBy === 'title') {
                // Sorting by title
                const titleA = a.querySelector('.review-title').textContent.toLowerCase();
                const titleB = b.querySelector('.review-title').textContent.toLowerCase();
                comparison = titleA.localeCompare(titleB);
            }
            return comparison;
        });

        // Append sorted reviews to container
        reviewsContainer.innerHTML = '';
        reviews.forEach(review => {
            reviewsContainer.appendChild(review);
            console.log('Appended sorted review:', review.querySelector('.review-title').textContent);
        });
    }

    // Event listener for the search box
    searchBox.addEventListener('input', function() {
        console.log('Search box input event triggered');
        filterReviews();
        sortReviews(); // Ensure sort is applied after filtering
    });

    // Event listener for the sort dropdown
    sortSelect.addEventListener('change', function() {
        console.log('Sort select change event triggered');
        sortReviews();
        filterReviews(); // Ensure filter is applied after sorting
    });
});

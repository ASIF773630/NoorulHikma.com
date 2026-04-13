/**
 * Noorul Hikma Shereea Arts College - Core JS
 */

document.addEventListener('DOMContentLoaded', () => {
    // ---- Navigation Scroll Effect ----
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ---- Mobile Menu Toggle ----
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navLinks.classList.toggle('active');
            // Toggle body scroll when menu is open
            if (mobileMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });
    }

    // ---- Smooth Scroll for internal navigation ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const dest = this.getAttribute('href');
            if (dest === '#') return;

            e.preventDefault();

            // Close mobile menu if open
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }

            const targetEle = document.querySelector(dest);
            if (targetEle) {
                // Offset calculation for fixed header
                const headerOffset = 80;
                const elementPosition = targetEle.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // ---- Intersection Observer for Scroll Animations ----
    // Select all elements needing fade-in
    const fadeElements = document.querySelectorAll('.fade-in-section, .animate-up');

    const appearOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px" // trigger slightly before it comes into full view
    };

    const appearOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                // Add visible class to trigger CSS animation
                entry.target.classList.add('is-visible');
                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    fadeElements.forEach(el => {
        appearOnScroll.observe(el);
    });

    // ---- Modal Logic ----
    const readMoreBtns = document.querySelectorAll('.read-more');
    const closeBtns = document.querySelectorAll('.close-modal');

    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modalId = btn.getAttribute('data-modal');
            if (modalId) {
                e.preventDefault();
                const modal = document.getElementById(modalId);
                if (modal) {
                    modal.style.display = 'flex';
                    // small delay for css transition
                    setTimeout(() => {
                        modal.classList.add('show');
                    }, 10);
                    document.body.style.overflow = 'hidden';
                }
            }
        });
    });

    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 300);
        });
    });

    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('show');
            setTimeout(() => {
                e.target.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 300);
        }
    });

    // ---- Admission Form Submit Logic ----
    const admissionForm = document.getElementById('admissionForm');

    // Global flag for iframe response handling
    window.submitted = false;

    window.handleFormResponse = function () {
        if (window.submitted) {
            alert('Application submitted successfully! Our admissions team will contact you shortly and your data has been stored in the cloud.');
            if (admissionForm) admissionForm.reset();
            window.submitted = false;
        }
    };

    if (admissionForm) {
        admissionForm.addEventListener('submit', function (e) {
            // Note: Don't e.preventDefault() here as we want the form to submit to the iframe target

            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Submitting...';
            submitBtn.disabled = true;

            // 1. Handle DOB split for Google Form
            const dobVal = document.getElementById('dob').value;
            if (dobVal) {
                const dateParts = dobVal.split('-'); // YYYY-MM-DD
                if (dateParts.length === 3) {
                    document.getElementById('dob_year').value = dateParts[0];
                    document.getElementById('dob_month').value = dateParts[1];
                    document.getElementById('dob_day').value = dateParts[2];
                }
            }

            // 2. Prepare applicant data for LOCAL STORAGE (Admin Dashboard backup)
            const applicant = {
                id: Date.now(),
                date: new Date().toLocaleDateString(),
                fullName: document.getElementById('fullName').value,
                dob: dobVal,
                phone: document.getElementById('phone').value,
                email: document.getElementById('email').value,
                address: document.getElementById('address').value,
                course: document.getElementById('course').value,
                schoolEd: document.getElementById('schoolEducation').value,
                madrassaEd: document.getElementById('madrassaEducation').value,
                marks: document.getElementById('marks') ? document.getElementById('marks').value : ''
            };

            try {
                let applications = JSON.parse(localStorage.getItem('noorulHikmaApplications')) || [];
                applications.push(applicant);
                localStorage.setItem('noorulHikmaApplications', JSON.stringify(applications));

                // Set flag for iframe load handler
                window.submitted = true;

                // Re-enable button after a delay in case iframe doesn't trigger load correctly
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 3000);

            } catch (err) {
                alert('Error processing application. Please try again.');
                console.error(err);
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                e.preventDefault(); // Stop submission if local save fails
            }
        });
    }

});

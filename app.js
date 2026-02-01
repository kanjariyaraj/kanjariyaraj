// Section Animation Start
function animateSections() {
    $('.section').each(function(index) {
        var sectionId = $(this).attr('id');
        var sectionPos = $(this).offset().top;
        var topOfWindow = $(window).scrollTop();
        var windowHeight = $(window).height();
        
        // If section is in viewport
        if (sectionPos < topOfWindow + windowHeight - 100) {
            $(this).addClass('visible');
            
            // Trigger skill bar animations when skills section becomes visible
            if (sectionId === 'skills' && !$(this).hasClass('skills-animated')) {
                $(this).addClass('skills-animated');
                animateSkillBars();
            }

// Animate hackathon/certification cards in the Hackathons & Certifications section
function animateHackathonCards() {
    var prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    $('.certification-card').each(function(index) {
        var $card = $(this);
        if ($card.hasClass('in-view')) return;
        var delay = index * 120;
        if (prefersReduced) {
            $card.addClass('in-view');
            return;
        }
        // ensure starting state before animating
        $card.css({ opacity: 0, transform: 'translateY(16px)' });
        setTimeout(function() {
            $card.css({ opacity: 1, transform: 'translateY(0)', transition: 'all 500ms ease-out' });
            $card.addClass('in-view');
        }, delay);
    });
}

            // Trigger resume timeline animations when resume section becomes visible
            if (sectionId === 'resume' && !$(this).hasClass('resume-animated')) {
                $(this).addClass('resume-animated');
                animateResumeTimeline();
            }

            // Trigger project cards animations when projects section becomes visible
            if (sectionId === 'projects' && !$(this).hasClass('projects-animated')) {
                $(this).addClass('projects-animated');
                animateProjectCards();
            }

            // Trigger hackathon/certification cards animations when that section becomes visible
            if (sectionId === 'hackathons-certifications' && !$(this).hasClass('hacks-animated')) {
                $(this).addClass('hacks-animated');
                animateHackathonCards();
            }
        }
    });
    
    $('.project-card').each(function(index) {
        var isVisible = $(this).css('opacity') !== '0';
    });
    
    $('.certification-card').each(function(index) {
        var isVisible = $(this).css('opacity') !== '0';
    });
}

// Animate skill progress bars
function animateSkillBars() {
    // Check if mobile device
    var isMobile = window.innerWidth <= 768;
    var animationDuration = isMobile ? '1.2s' : '1.5s'; // Faster on mobile
    var staggerDelay = isMobile ? 80 : 100; // Shorter delay on mobile

    // Respect reduced motion preferences
    var prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Select all progress bars inside the Skills section based on current HTML structure
    $('#skills .bg-sky-200 .bg-sky-600').each(function(index) {
        var $skillBar = $(this);

        // Determine target width from inline style if present, otherwise use computed width
        var inlineStyle = $skillBar.attr('style') || '';
        var match = inlineStyle.match(/width:\s*([^;]+)/i);
        var targetWidth = match ? match[1].trim() : $skillBar.css('width');

        if (prefersReduced) {
            // No animation for users who prefer reduced motion
            $skillBar.css('width', targetWidth);
            return;
        }

        // Reset width to 0 first
        $skillBar.css('width', '0');

        // Animate to target width with delay based on index
        setTimeout(function() {
            $skillBar.css({
                'width': targetWidth,
                'transition': 'width ' + animationDuration + ' ease-out'
            });
        }, index * staggerDelay);
    });
}

// Animate resume timeline items
function animateResumeTimeline() {
    // Respect reduced motion preferences
    var prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    // Select timeline rows within #resume
    var $items = $('#resume .flex').filter(function() {
        return $(this).find('.w-px.h-full').length > 0 || $(this).find('.w-10.h-10').length > 0;
    });

    // Stagger and alternate animations left/right
    $items.each(function(index) {
        var $row = $(this);
        if ($row.hasClass('resume-item-animated')) return;
        $row.addClass('resume-item-animated');

        var cls = (index % 2 === 0) ? 'slide-in-left' : 'slide-in-right';
        var delay = index * 120; // ms

        // Prevent flash: start hidden then add animation class
        $row.css({ opacity: 0 });

        setTimeout(function() {
            $row.css({ opacity: '' });
            $row.addClass(cls);
        }, delay);
    });
}

// Animate project cards in the Projects section
function animateProjectCards() {
    var prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    $('.project-card').each(function(index) {
        var $card = $(this);
        if ($card.hasClass('in-view')) return;
        var delay = index * 120;
        if (prefersReduced) {
            $card.addClass('in-view');
            return;
        }
        setTimeout(function() {
            $card.addClass('in-view');
        }, delay);
    });
}

// Ensure About section elements are properly animated
function animateAboutSection() {
    var aboutSection = $('#about');
    if (aboutSection.length > 0) {
        var sectionPos = aboutSection.offset().top;
        var topOfWindow = $(window).scrollTop();
        var windowHeight = $(window).height();
        
        // If About section is in viewport
        if (sectionPos < topOfWindow + windowHeight - 100) {
            aboutSection.addClass('visible');
        }
    }
}

// Run on scroll and on page load
$(window).on('scroll', function() {
    animateSections();
    animateAboutSection();
});

$(document).ready(function() {
    // Add visible class to first section (home) immediately
    $('#home').addClass('visible');
    
    // Detect mobile device
    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Add mobile class to body for CSS targeting
    if (isMobile) {
        $('body').addClass('mobile-device');
    }
    
    // Run animation for other sections
    animateSections(); 
    animateAboutSection();
    
    // Also add a slight delay to ensure all content is rendered
    setTimeout(animateSections, 100);
    setTimeout(animateAboutSection, 100);
    setTimeout(animateSections, 500);
    setTimeout(animateAboutSection, 500);
    setTimeout(animateSections, 1000);
    setTimeout(animateAboutSection, 1000);
    
    // Fallback: Make sure project cards and certification cards are visible after 2 seconds
    setTimeout(function() {
        $('.project-card').addClass('always-visible');
        $('.certification-card').addClass('always-visible');
    }, 2000);
    
    // Additional fallback: Check if sections have visible class after 3 seconds
    setTimeout(function() {
        $('.section').each(function() {
            var isVisible = $(this).hasClass('visible');
            if (!isVisible) {
                $(this).addClass('visible');
            }
        });
    }, 3000);
    
    // Add staggered animation delays for certification cards
    setTimeout(function() {
        $('.certification-card').each(function(index) {
            $(this).css('transition-delay', (index * 0.1) + 's');
        });
    }, 100);
    
    // Ensure no duplicate Contact link is added dynamically
    if (
        $('#contact').length > 0 &&
        $('.flex.flex-col.p-5.text-lg a[href="#contact"]').length === 0
    ) {
        $('.flex.flex-col.p-5.text-lg').append(
            '<li class="mt-4 hover:text-sky-500 text-slate-400 transition">' +
                '<a href="#contact">' +
                    '<i class="fas fa-envelope"></i>' +
                    '<span class="ml-3">Contact</span>' +
                '</a>' +
            '</li>'
        );
    }
    
    // Form submission handling with EmailJS
    $('#contact-form').on('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        var name = $('#name').val().trim();
        var email = $('#email').val().trim();
        var message = $('#message').val().trim();
        
        // Simple validation
        if (!name || !email || !message) {
            $('#form-status').removeClass('hidden form-status-success').addClass('form-status-error').text('Please fill in all fields.').removeClass('hidden');
            return;
        }
        
        // Email validation
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            $('#form-status').removeClass('hidden form-status-success').addClass('form-status-error').text('Please enter a valid email address.').removeClass('hidden');
            return;
        }
        
        // Show loading state
        var submitBtn = $(this).find('button[type="submit"]');
        var originalText = submitBtn.html();
        submitBtn.text('Sending...').prop('disabled', true);
        
        // Hide any previous status messages
        $('#form-status').addClass('hidden');
        
        // Send email using EmailJS with your provided keys
        emailjs.send("service_8n0iyfq", "template_xo8iaaa", {
            name: name,
            email: email,
            message: message,
            reply_to: email
        }).then(function(response) {
            // Reset button
            submitBtn.html(originalText).prop('disabled', false);
            
            // Show success message
            $('#form-status').removeClass('hidden form-status-error').addClass('form-status-success').text('Message sent successfully! I will get back to you soon.').removeClass('hidden');
            
            // Reset form
            $('#contact-form')[0].reset();
            
            // Hide success message after 5 seconds
            setTimeout(function() {
                $('#form-status').addClass('hidden');
            }, 5000);
        }, function(error) {
            // Reset button
            submitBtn.html(originalText).prop('disabled', false);
            
            // Show error message
            $('#form-status').removeClass('hidden form-status-success').addClass('form-status-error').text('Failed to send message. Please try again later.').removeClass('hidden');
            
            console.error('EmailJS Error:', error);
        });
    });
});

// Medium Blogs: fetch and render from @rajkanjariya2020
try {
    var $mediumContainer = $('#medium-blogs');
    if ($mediumContainer && $mediumContainer.length) {
        var data = { rss_url: 'https://medium.com/feed/@rajkanjariya2020' };
        $.get('https://api.rss2json.com/v1/api.json', data, function(response) {
            if (response && response.status === 'ok' && Array.isArray(response.items)) {
                var items = response.items.map(function(item, idx) {
                    var cats = Array.isArray(item.categories) ? item.categories : [];
                    return {
                        title: item.title || '',
                        link: item.link || '#',
                        categories: cats,
                        pubDate: item.pubDate || '',
                        thumbnail: item.thumbnail || '',
                        description: item.description || '',
                        idx: idx
                    };
                });

                function hasTag(it, needle) {
                    var n = (needle || '').toLowerCase();
                    for (var i = 0; i < it.categories.length; i++) {
                        if ((it.categories[i] + '').toLowerCase().indexOf(n) !== -1) return true;
                    }
                    return false;
                }

                function cardHtml(it) {
                    var tags = '';
                    for (var i = 0; i < it.categories.length; i++) {
                        tags += '<span class="inline-block bg-sky-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">' + it.categories[i] + '</span>';
                    }
                    var thumb = it.thumbnail ? '<img class="w-full h-40 object-cover rounded-t-lg" src="' + it.thumbnail + '" alt="' + (it.title || 'Medium cover') + '">' : '';
                    var dateStr = '';
                    try { if (it.pubDate) { var d = new Date(it.pubDate); dateStr = isNaN(d.getTime()) ? '' : d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }); } } catch (e) {}
                    var excerpt = '';
                    try { var raw = (it.description || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim(); excerpt = raw.length > 160 ? raw.slice(0, 157) + '...' : raw; } catch (e) {}
                    return (
                        '<a href="' + it.link + '" target="_blank" class="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm mb-5 flex flex-col overflow-hidden" data-tags="' + (it.categories.join(',').toLowerCase()) + '">' +
                          (thumb || '') +
                          '<div class="p-5">' +
                            '<div>' +
                              '<h5 class="text-gray-900 font-bold text-2xl tracking-tight mb-2">' + it.title + '</h5>' +
                              (dateStr ? '<p class="text-sm text-gray-500 mb-3">' + dateStr + '</p>' : '') +
                              (excerpt ? '<p class="text-gray-700 text-sm leading-6">' + excerpt + '</p>' : '') +
                            '</div>' +
                            '<div class="pt-4 pb-2">' + tags + '</div>' +
                          '</div>' +
                          '<div class="p-5 mt-auto">' +
                            '<div class="m-auto text-white bg-sky-500 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center bottom-0">' +
                              'Read Article <i class="ml-3 fas fa-angles-right"></i>' +
                            '</div>' +
                          '</div>' +
                        '</a>'
                    );
                }

                function render(filter) {
                    var filtered = items.filter(function(it) {
                        if (filter === 'hackathon') return hasTag(it, 'hackathon');
                        if (filter === 'next') return hasTag(it, 'next');
                        return true;
                    });
                    if (filter === 'all') {
                        filtered.sort(function(a, b) {
                            var ap = (hasTag(a, 'hackathon') || hasTag(a, 'next')) ? 1 : 0;
                            var bp = (hasTag(b, 'hackathon') || hasTag(b, 'next')) ? 1 : 0;
                            if (ap !== bp) return bp - ap;
                            return a.idx - b.idx;
                        });
                    }
                    var html = '';
                    for (var i = 0; i < filtered.length && i < 9; i++) {
                        html += cardHtml(filtered[i]);
                    }
                    $mediumContainer.html(html || '<p class="text-gray-600">No blog posts found.</p>');
                }

                render('all');

                var $filters = $('#blog-filters .filter-btn');
                if ($filters && $filters.length) {
                    $filters.on('click', function() {
                        $filters.removeClass('text-white bg-sky-500 hover:bg-sky-800 focus:ring-sky-300 active').addClass('text-sky-700 bg-sky-100 hover:bg-sky-200 focus:ring-sky-200');
                        $(this).addClass('text-white bg-sky-500 hover:bg-sky-800 focus:ring-sky-300 active').removeClass('text-sky-700 bg-sky-100 hover:bg-sky-200 focus:ring-sky-200');
                        var f = $(this).data('filter');
                        render(f);
                    });
                }
            } else {
                $mediumContainer.html('<p class="text-gray-600">Unable to load Medium posts right now.</p>');
            }
        }).fail(function() {
            $mediumContainer.html('<p class="text-gray-600">Unable to load Medium posts right now.</p>');
        });
    }
} catch (err) {
    try { $('#medium-blogs').html('<p class="text-gray-600">Unable to load Medium posts right now.</p>'); } catch (e) {}
}

// NEW SIMPLE MOBILE MENU FUNCTIONS
function openSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const backdrop = document.getElementById('backdrop');
    if (sidebar) {
        console.log('openSidebar called');
        sidebar.classList.remove('hidden');
        sidebar.style.position = 'fixed';
        sidebar.style.top = '0px';
        sidebar.style.left = '0px';
        sidebar.style.display = 'block';
        // Ensure Tailwind 'block' utility is present to satisfy .sidebar.block CSS
        sidebar.classList.add('block');
        // start off-canvas, force reflow, then slide in
        sidebar.style.transform = 'translateX(-100%)';
        // force reflow so the next transform animates
        void sidebar.offsetHeight;
        sidebar.classList.add('is-open');
        sidebar.style.transform = 'translateX(0)';
        // debug: log rect and computed styles
        setTimeout(function(){
            const rect = sidebar.getBoundingClientRect();
            const cs = window.getComputedStyle(sidebar);
            console.log('Sidebar rect:', rect);
            console.log('Sidebar display:', cs.display, 'position:', cs.position, 'zIndex:', cs.zIndex, 'transform:', cs.transform);
        }, 50);
    } else {
        console.error('Sidebar element not found');
    }
    if (backdrop) {
        backdrop.style.display = 'block';
    }
    document.body.style.overflow = 'hidden';
}

function hideSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const backdrop = document.getElementById('backdrop');
    if (sidebar) {
        console.log('hideSidebar called');
        sidebar.classList.remove('is-open');
        // slide out inline to ensure transition
        sidebar.style.transform = 'translateX(-100%)';
        // hide after animation ends
        const onEnd = function() {
            sidebar.style.display = 'none';
            sidebar.classList.add('hidden');
            sidebar.classList.remove('block');
            sidebar.removeEventListener('transitionend', onEnd);
        };
        sidebar.addEventListener('transitionend', onEnd);
    }
    if (backdrop) {
        backdrop.style.display = 'none';
    }
    document.body.style.overflow = '';
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const backdrop = document.getElementById('backdrop');
    const sidebar = document.querySelector('.sidebar');
    const navLinks = document.querySelectorAll('.sidebar ul li a');
    // Track original placement to restore on desktop
    const originalSidebarParent = sidebar ? sidebar.parentElement : null;
    const originalSidebarNext = sidebar ? sidebar.nextSibling : null;

    function moveSidebarToBody() {
        if (sidebar && sidebar.parentElement !== document.body) {
            document.body.appendChild(sidebar);
        }
        if (backdrop && backdrop.parentElement !== document.body) {
            document.body.appendChild(backdrop);
        }
    }

    function restoreSidebarToOriginal() {
        if (sidebar && originalSidebarParent && sidebar.parentElement === document.body) {
            originalSidebarParent.insertBefore(sidebar, originalSidebarNext);
        }
        // keep backdrop on body even for desktop
        if (backdrop && backdrop.parentElement !== document.body) {
            document.body.appendChild(backdrop);
        }
    }

    // Initial placement per breakpoint
    if (window.innerWidth < 768) {
        moveSidebarToBody();
    } else {
        restoreSidebarToOriginal();
    }
    
    console.log('Mobile menu initialized!');
    console.log('Menu button found:', menuToggle ? 'YES' : 'NO');
    console.log('Window width:', window.innerWidth);
    
    // Menu toggle button click
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            console.log('Menu button clicked!');
            if (sidebar.style.display === 'block') {
                hideSidebar();
            } else {
                openSidebar();
            }
        });
    } else {
        console.error('Menu button NOT found!');
    }
    
    // Backdrop click to close
    if (backdrop) {
        backdrop.addEventListener('click', hideSidebar);
    }
    
    // Close button click
    const closeBtn = document.querySelector('button[onclick="hideSidebar()"]');
    if (closeBtn) {
        closeBtn.addEventListener('click', hideSidebar);
    }
    
    // Close menu when clicking nav links on mobile
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            if (window.innerWidth < 768) {
                hideSidebar();
            }
        });
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (sidebar && backdrop) {
            if (window.innerWidth >= 768) {
                // Desktop: restore placement, show sidebar, hide backdrop, reset state
                restoreSidebarToOriginal();
                sidebar.classList.remove('hidden');
                sidebar.style.display = 'block';
                sidebar.classList.remove('is-open');
                sidebar.style.position = '';
                sidebar.style.left = '';
                sidebar.style.top = '';
                sidebar.style.transform = '';
                backdrop.style.display = 'none';
                document.body.style.overflow = '';
            } else {
                // Mobile: move to body, hide sidebar off-canvas by default
                moveSidebarToBody();
                sidebar.classList.remove('is-open');
                sidebar.style.display = 'none';
                backdrop.style.display = 'none';
            }
        }
    });
    
    // Set initial state
    if (sidebar) {
        if (window.innerWidth >= 768) {
            // Desktop visible
            sidebar.classList.remove('hidden');
            sidebar.style.display = 'block';
            sidebar.classList.remove('is-open');
            sidebar.style.position = '';
            sidebar.style.left = '';
            sidebar.style.top = '';
            sidebar.style.transform = '';
        } else {
            // Mobile hidden initially
            sidebar.style.display = 'none';
        }
    }

    const sections = document.querySelectorAll('.section');
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { root: null, rootMargin: '0px 0px -15% 0px', threshold: 0.15 });
        sections.forEach((el) => observer.observe(el));
    } else {
        sections.forEach((el) => el.classList.add('visible'));
    }
});
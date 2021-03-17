$(document).ready(function () {
    // Tabs nav
    $('.tabs__link').on('click', function (e) {
        e.preventDefault();
        let tab = $(this).attr('href'),
            tabs = $(this).parents('.tabs'),
            tabsNav = $(this).parent(),
            scrolled = tabsNav.scrollLeft(),
            posLeft = $(this).offset().left,
            newScroll = scrolled + posLeft - 15;
        tabs.find('.tabs__link').removeClass('active');
        $(this).addClass('active');
        tabs.find('.tabs__item').removeClass('active');
        $(tab).addClass('active');
        tabsNav.animate({scrollLeft: newScroll}, 400);
        return false;
    })

    // Reviews carousel
    $('.reviews-slider').owlCarousel({
		items : 1,
		autoHeight : true,
		dots : false,
		nav : true,
        navText: [],
	}).on('translated.owl.carousel', function(event) {
		let hash = $('.owl-item.active .review', $(this)).data('hash'),
            navLink = $('.review-link[href="#' + hash + '"]'),
            nav = navLink.parent(),
            scrolled = nav.scrollLeft(),
            posLeft = navLink.position().left,
            navLeft = nav.offset().left,
            newScroll = scrolled + posLeft - navLeft - 15;
        $('.review-link.active').removeClass('active');
        navLink.addClass('active');
        nav.animate({scrollLeft: newScroll}, 400);
	});

    // File upload processing
    $upload = $('.file-upload');
    if ($upload.length) {
        let fileUploadFields = document.querySelectorAll('.file-upload__field'),
            $form = $('.form'),
            $input = ('.file-upload__field'),
            $label = $('.file-upload__name');

        function fileOnLoad(files) {
            let fileName = files[0].name;

            if (fileName) {
                $label.text(fileName);
                $upload.addClass('file-upload--loaded');
            } else {
                $upload.removeClass('file-upload--loaded');
            }
        }

        Array.prototype.forEach.call(fileUploadFields, (input) => {
            input.addEventListener('change', function () {
                fileOnLoad(this.files);
            }, { passive: true });
        });

        // Advanced upload (drag n drop)
        var isAdvancedUpload = function () {
            var div = document.createElement('div');
            return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window;
        }();

        if (isAdvancedUpload) {
            $upload.addClass('has-advanced-upload');
            var droppedFiles = false;

            $upload.on('drag dragstart dragend dragover dragenter dragleave drop', function (e) {
                e.preventDefault();
                e.stopPropagation();
            })
                .on('dragover dragenter', function () {
                    $upload.addClass('is-dragover');
                })
                .on('dragleave dragend drop', function () {
                    $upload.removeClass('is-dragover');
                })
                .on('drop', function (e) {
                    droppedFiles = e.originalEvent.dataTransfer.files;
                    fileOnLoad(droppedFiles);
                });

            var ajaxData = new FormData($form.get(0));

            if (droppedFiles) {
                $.each(droppedFiles, function (i, file) {
                    ajaxData.append($input.attr('name'), file);
                });
            }

            $.ajax({
                url: $form.attr('action'),
                type: $form.attr('method'),
                data: ajaxData,
                dataType: 'json',
                cache: false,
                contentType: false,
                processData: false,
                complete: function () {
                    $form.removeClass('is-uploading');
                },
                success: function (data) {
                    $form.addClass(data.success == true ? 'is-success' : 'is-error');
                    if (!data.success) $errorMsg.text(data.error);
                },
                error: function () {
                    console.log('Form submitting error');
                }
            });
        }
    }
})

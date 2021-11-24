"use strict";
const JSCCommon = {

	btnToggleMenuMobile: [].slice.call(document.querySelectorAll(".toggle-menu-mobile--js")),
	menuMobile: document.querySelector(".menu-mobile--js"),
	menuMobileLink: [].slice.call(document.querySelectorAll(".menu-mobile--js ul li a")),

	modalCall() {
		const link = ".link-modal-js";

		Fancybox.bind(link, {
			arrows: false,
			infobar: false,
			touch: false,
			infinite: false,
			dragToClose: false,
			type: 'inline',
			autoFocus: false,
			l10n: {
				Escape: "Закрыть",
				NEXT: "Вперед",
				PREV: "Назад", 
			}, 
		}); 
		document.querySelectorAll(".modal-close-js").forEach(el=>{
			el.addEventListener("click", ()=>{
				Fancybox.close();
			})
		})
		Fancybox.bind('[data-fancybox]', {
			placeFocusBack: false,
		});
		const linkModal = document.querySelectorAll(link);
		function addData() {
			linkModal.forEach(element => {
				element.addEventListener('click', () => {
					let modal = document.querySelector(element.getAttribute("href"));
					const data = element.dataset;

					function setValue(val, elem) {
						if (elem && val) {
							const el = modal.querySelector(elem)
							el.tagName == "INPUT"
								? el.value = val
								: el.innerHTML = val;
							// console.log(modal.querySelector(elem).tagName)
						}
					}
					setValue(data.title, '.ttu');
					setValue(data.text, '.after-headline');
					setValue(data.btn, '.btn');
					setValue(data.order, '.order');
				})
			})
		}
		if (linkModal) addData();
	},
	// /modalCall
	toggleMenu() {
		const toggle = this.btnToggleMenuMobile;
		const menu = this.menuMobile;
		document.addEventListener("click", function (event) {
			const toggleEv = event.target.closest(".toggle-menu-mobile--js");
			if (!toggleEv) return;
			toggle.forEach(el => el.classList.toggle("on"));
			menu.classList.toggle("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.toggle("fixed")); 
		}, { passive: true });
	},
	closeMenu() {
		let menu = this.menuMobile;
		if (!menu) return;
		if (menu.classList.contains("active")) {
			this.btnToggleMenuMobile.forEach(element => element.classList.remove("on"));
			this.menuMobile.classList.remove("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.remove("fixed")); 
		}

	},
	mobileMenu() {
		if (!this.menuMobileLink) return;

		this.toggleMenu();
		document.addEventListener('mouseup', (event) => {
			let container = event.target.closest(".menu-mobile--js.active"); // (1)
			let link = event.target.closest(".menu-mobile li a"); // (1)
			let toggle = event.target.closest('.toggle-menu-mobile--js.on'); // (1)
			if (!container && !toggle || link) this.closeMenu();
		}, { passive: true });

		// window.addEventListener('resize', () => {
		// 	if (window.matchMedia("(min-width: 992px)").matches) this.closeMenu();
		// }, { passive: true });
	},
	// /mobileMenu


	inputMask() {
		// mask for input
		let InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
		InputTel.forEach(element => element.setAttribute("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}"));
		Inputmask("+9(999)999-99-99").mask(InputTel);
	},

	sendForm() {
		var gets = (function () {
			var a = window.location.search;
			var b = new Object();
			var c;
			a = a.substring(1).split("&");
			for (var i = 0; i < a.length; i++) {
				c = a[i].split("=");
				b[c[0]] = c[1];
			}
			return b;
		})();
		// form
		$(document).on('submit', "form", function (e) {
			e.preventDefault();
			const th = $(this);
			var data = th.serialize();
			th.find('.utm_source').val(decodeURIComponent(gets['utm_source'] || ''));
			th.find('.utm_term').val(decodeURIComponent(gets['utm_term'] || ''));
			th.find('.utm_medium').val(decodeURIComponent(gets['utm_medium'] || ''));
			th.find('.utm_campaign').val(decodeURIComponent(gets['utm_campaign'] || ''));
			$.ajax({
				url: 'action.php',
				type: 'POST',
				data: data,
			}).done(function (data) {

				Fancybox.close();
				Fancybox.show([{ src: "#modal-thanks", type: "inline" }]);
				// window.location.replace("/thanks.html");
				setTimeout(function () {
					// Done Functions
					th.trigger("reset");
					// $.magnificPopup.close();
					// ym(53383120, 'reachGoal', 'zakaz');
					// yaCounter55828534.reachGoal('zakaz');
				}, 4000);
			}).fail(function () { });

		});
	},
	heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		let vh = window.innerHeight * 0.01;
		// Then we set the value in the --vh custom property to the root of the document
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		// We listen to the resize event
		window.addEventListener('resize', () => {
			// We execute the same script as before
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}, { passive: true });
	},
	animateScroll() {
		$(document).on('click', " .menu li a, .scroll-link, .headerBlock__btn", function () {
			const elementClick = $(this).attr("href");
			if (!document.querySelector(elementClick)) {
				$(this).attr("href", '/' + elementClick)
			}
			else {
				let destination = $(elementClick).offset().top;
				$('html, body').animate({ scrollTop: destination - 80 }, 0);
				return false;
			}
		});
	},
	getCurrentYear(el) {
		let now = new Date();
		let currentYear = document.querySelector(el);
		if (currentYear) currentYear.innerText = now.getFullYear();
	},

};
const $ = jQuery;

function eventHandler() {
	// JSCCommon.ifie();
	JSCCommon.modalCall();
	// JSCCommon.tabscostume('tabs');
	JSCCommon.getCurrentYear('.currentYear');
	JSCCommon.mobileMenu();
	JSCCommon.animateScroll();
	JSCCommon.inputMask();
	JSCCommon.sendForm();
	JSCCommon.heightwindow();
	//JSCCommon.makeDDGroup();
	// JSCCommon.toggleShow(".catalog-block__toggle--desctop", '.catalog-block__dropdown');
	// JSCCommon.animateScroll();
	
	// JSCCommon.CustomInputFile(); 
	// var x = window.location.host;
	// let screenName;
	// screenName = document.body.dataset.bg;
	// if (screenName && x.includes("localhost:30")) {
	// 	document.body.insertAdjacentHTML("beforeend", `<div class="pixel-perfect" style="background-image: url(screen/${screenName});"></div>`);
	// }


	function setFixedNav() {
		let topNav = document.querySelector('.top-nav  ');
		if (!topNav) return;
		window.scrollY > 0
			? topNav.classList.add('fixed')
			: topNav.classList.remove('fixed');
	}

	function whenResize() {
		setFixedNav();
	}

	window.addEventListener('scroll', () => {
		setFixedNav();

	}, { passive: true })
	window.addEventListener('resize', () => {
		whenResize();
	}, { passive: true });

	whenResize();


	let defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		spaceBetween: 0,
		loop: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true,
		},
	}

	const sOurClientsSlider = new Swiper('.sOurClients__slider--js', {
		// ...defaultSl,
		slidesPerView: 'auto',
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		spaceBetween: 20,
		navigation: {
			nextEl: '.sOurClients .section-title__arrows .swiper-button-next',
			prevEl: '.sOurClients .section-title__arrows .swiper-button-prev',
		},
		// slideToClickedSlide: true,
		breakpoints: {
			576: {
				slidesPerView: 'auto',
				spaceBetween: 24
			},
			768: {
				slidesPerView: 4,
				spaceBetween: 24
			},
			992: {
				slidesPerView: 4,
				spaceBetween: 30
			},
			1400: {
				slidesPerView: 4,
				spaceBetween: 40
			},
		}
	});
	const sAreasOfActivitySlider = new Swiper('.sAreasOfActivity__slider--js', {
		slidesPerView: 'auto',
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		spaceBetween: 0,
		navigation: {
			nextEl: '.sAreasOfActivity__slider .swiper-button-next',
			prevEl: '.sAreasOfActivity__slider .swiper-button-prev',
		},
		pagination: {
			el: ' .sAreasOfActivity .swiper-pagination',
			type: 'bullets',
			clickable: true,
		},
		breakpoints: {
			576: {
				spaceBetween: 30,
				slidesPerView: 1
			},
			992: {
				spaceBetween: 30,
				slidesPerView: 3
			},
			1400: {
				spaceBetween: 0,
				slidesPerView: 2
			},
		}
	});


	const sAdvantagesSlider = new Swiper('.sAdvantages__slider--js', {
		slidesPerView: 'auto',
		watchOverflow: true,
		spaceBetween: 24,
		pagination: {
			el: ' .sAdvantages .swiper-pagination',
			type: 'bullets',
			clickable: true,
		},
		autoplay: {
			delay: 5000,
		},
	});

	const sAdvantagesBgSlider = new Swiper('.sAdvantages__slider-bg--js', {
		slidesPerView: 1,
		lazy: {
			loadPrevNext: true,
		},
		effect: 'fade',
		fadeEffect: {
			crossFade: true
		},
		watchOverflow: true,
		spaceBetween: 0,  
		autoplay: {
			delay: 5000,
		},
		thumbs: {
			swiper: sAdvantagesSlider
		}
	});

	$(".sAdvantages__slide").click(function(){
		sAdvantagesBgSlider.autoplay.start();
		sAdvantagesSlider.autoplay.start();
	})


	// modal window

	

};
if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}

window.onload = function () {
	// document.body.classList.add('loaded_hiding');
	window.setTimeout(function () {
		// document.body.classList.add('loaded');
		document.body.classList.remove('loaded_hiding');
		document.querySelector('.loader').classList.add('off');
	}, 500);
}

if (document.querySelector("#map")) {
	

	ymaps.ready(function () {
		var myMap = new ymaps.Map('map', {
						center: [53.21288957121954,50.299305000000004],
						zoom: 13,
						controls: ['zoomControl']
				}, {
						//searchControlProvider: 'yandex#search'
				}),
				// Создаём макет содержимого.
				// MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
				// 		'<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
				// ),
	
				myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
						hintContent: 'Поволжская Металлоломная Компания',
						balloonContent: 'г. Самара, ул. Земеца, д. 32'
				}, {
						// Опции.
						// Необходимо указать данный тип макета.
						iconLayout: 'default#image',
						// Своё изображение иконки метки.
						iconImageHref: 'img/svg/logo.svg',
						// Размеры метки.
						iconImageSize: [60, 42],
						// Смещение левого верхнего угла иконки относительно
						// её "ножки" (точки привязки).
						iconImageOffset: [-5, -38]
				});
		myMap.behaviors.disable('scrollZoom');
		//на мобильных устройствах... (проверяем по userAgent браузера)
		if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
		//... отключаем перетаскивание карты
			myMap.behaviors.disable('drag');
		}
		myMap.geoObjects
				.add(myPlacemark);
	});
	
	}

	
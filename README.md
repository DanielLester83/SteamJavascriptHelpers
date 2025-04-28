# SteamJavascriptHelpers
This is helper javascript code that can be injected into store.steampowerd.com with an firefox extension called "Javascript".
It speeds up the highlight carousel and adds a last visited checkbox.

<code>HighlightPlayer.prototype.StartTimer = function()
{
	this.ClearInterval();
	this.interval = window.setTimeout( $J.proxy( this.Transition, this ), 800 );
}

//nSaveDelay = 700; // 5 seconds

var checkbox = document.createElement('input');
checkbox.type = "checkbox";
checkbox.id = "lastvisited";
var div = document.getElementById('queue_ignore_menu_arrow');
var HTML = div.innerHTML; 
var lastvisited = localStorage.getItem('lastvisited ' + window.location.href);
if( lastvisited == null ){
 lastvisited = new Date();
 checkbox.checked = false;
 div.innerHTML += " ";
}else{
	checkbox.checked = true;
	div.innerHTML += lastvisited + " ";	
}
div.appendChild(checkbox);
checkbox.addEventListener('click', (event) => {
  if (event.currentTarget.checked) {
		var newdate = new Date();
		localStorage.setItem('lastvisited ' + window.location.href, newdate);
	  div.innerHTML = HTML + newdate + " ";
	  div.appendChild(checkbox);
  } else {
    localStorage.removeItem('lastvisited ' + window.location.href);
		div.innerHTML = HTML + " ";
		div.appendChild(checkbox);
  }
})



function InitHorizontalAutoSliders()
{
	$J('.store_horizontal_autoslider' ).each( function() {
		var $Scroll = $J(this);
		var $Wrapper = $Scroll.wrap( $J('<div/>', {'class': 'store_horizontal_autoslider_ctn' } ) ).parent();
		var $SliderCtn = $J('<div/>', {'class': 'slider_ctn store_autoslider'} );
		var $SliderLeft = $J('<div/>', {'class': 'slider_left'} ).append($J('<span/>'));
		var $SliderRight = $J('<div/>', {'class': 'slider_right'} ).append($J('<span/>'));
		var $Slider = $J('<div/>', {'class': 'slider' } );
		$SliderCtn.append(
			$SliderLeft, $SliderRight,
			$J('<div/>', {'class': 'slider_bg' } ),
			$Slider.append( $J('<div/>', {'class': 'handle'} ) )
		);
		$Wrapper.after( $SliderCtn );
		var fnFixHeight = function() { $Wrapper.height( $Scroll[0].clientHeight ); };

		if ( $Scroll.data( 'usability' ) )
			$SliderCtn.attr( 'data-usability', $Scroll.data( 'usability' ) );

		$Wrapper.on('v_contentschanged.AutoSlider', function() {
			fnFixHeight();
			$Wrapper.find('img' ).one('load', fnFixHeight );
		} );
		$J(window ).on('resize.AutoSlider', fnFixHeight );

		$Scroll.attr( 'data-panel', '{"maintainX":true,"bFocusRingRoot":true,"flow-children":"row"}' );

		window.setTimeout( function() {
			$Wrapper.trigger('v_contentschanged.AutoSlider');

			var Slider = new CScrollSlider( $Scroll, $SliderCtn );

			var fnGetScrollIncrement = function() {
				var $TryChild = $Scroll;
				do
				{
					$TryChild = $TryChild.children().first();
					if ( $TryChild.width() && $TryChild.outerWidth() < $Scroll.width() )
					{
						// optional param determines whether or not we include margin
						// As a note, if you use selective margin make sure you're using
						// :not(:last-child) as it'll peek the first and you want to ensure
						// that element has the expected margin.
						return $TryChild.outerWidth( true );
					}
				} while ( $TryChild.length );

				return $Wrapper.width() / 3;
			};

			$SliderLeft.click( function() {
				Slider.SetValue( Slider.GetValue() - fnGetScrollIncrement(), 50000 );
			});
			$SliderRight.click( function() {
				Slider.SetValue( Slider.GetValue() + fnGetScrollIncrement(), 50000 );
			});

		}, 1 );
	});

	$J('.store_horizontal_minislider' ).each( function() {
		var $Scroll = $J(this);
		var $Wrapper = $Scroll.wrap( $J('<div/>', {'class': 'store_horizontal_minislider_ctn' } ) ).parent();
		var $SliderLeft = $J('<div/>', {'class': 'slider_left'} ).append($J('<span/>'));
		var $SliderRight = $J('<div/>', {'class': 'slider_right'} ).append($J('<span/>'));

		$Wrapper.append( $SliderLeft, $SliderRight );

		var fnShowHideButtons = function()
		{
			var nTallestChild = 0;
			$Scroll.children().each( function() {
				nTallestChild = Math.max( nTallestChild, $J(this ).outerHeight() );
			});
			$Wrapper.css('height', nTallestChild );

			if ( $Scroll.scrollLeft() <= 1 )
				$SliderLeft.hide();
			else
				$SliderLeft.show();

			if ( $Scroll.scrollLeft() + $Scroll.width() < $Scroll[0].scrollWidth - 1 )
				$SliderRight.show();
			else
				$SliderRight.hide();
		};

		$Scroll.on( 'scroll.AutoSlider v_contentschagned.AutoSlider', fnShowHideButtons );
		$J(window ).on('resize.AutoSlider', fnShowHideButtons );

		$SliderLeft.click( function() {
			$Scroll.animate( {scrollLeft: Math.max( 0, $Scroll.scrollLeft() - $Wrapper.width() ) } );
			fnShowHideButtons();
		} );
		$SliderRight.click( function() {
			$Scroll.animate( {scrollLeft: Math.min( $Scroll[0].scrollWidth - $Scroll.width(), $Scroll.scrollLeft() + $Wrapper.width() ) } );
			fnShowHideButtons();
		} );

		window.setTimeout( fnShowHideButtons, 1 );
	});
}

this.HighlightItem( firstItem );
</code>

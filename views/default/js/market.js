define(['elgg', 'jquery'], function (elgg, $) {

$(document).ready(function(){
	var $form = $('form[name="marketForm"]');
	$form.on('submit', function(e) {
			
		if(!($('input[name="accept_terms"]').prop('checked'))) {		
			alert(elgg.echo('market:accept:terms:error'));
			$('input[name="accept_terms"]').focus();
			e.preventDefault(); //prevent form from submitting
		}
	});
	
	$('#plaintext-description').keyup(function () {
		var $textarea = $(this);
		var limit = $textarea.data('limit');
	    var remaining = limit - $textarea.val().length;
		var $form = $textarea.closest('form')
		var $counter = $form.find('[data-counter]').eq(0);
		$counter.find('[data-counter-indicator]').text(remaining);
		if (remaining < 0) {
				$counter.addClass('market-counter-overflow');
				$form.find('[type="submit"]').prop('disabled', true).addClass('elgg-state-disabled');
			} else {
				$counter.removeClass('market-counter-overflow');
				$form.find('[type="submit"]').prop('disabled', false).removeClass('elgg-state-disabled');
			}
	});

	$('#market-type').change(function() {
		var value = $(this).val();
		$('#market-price').prop('readonly', false);	
		if (value == 'free') {
			$('#market-price').val('0');
			$('#market-price').prop('readonly', true);
		} else if (value == 'swap') {
			$('#market-price').val('');
			$('#market-price').prop('readonly', true);
		}
	});
});
});
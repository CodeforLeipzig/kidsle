(function() {
    function filterResults() {
        var $sb = $('#searchbox');
        $sb.keyup(function() {
            var value = $(this).val();
            console.log(value);
        }).keyup();
    }


    $(document).ready(function() {
        filterResults();
    });
})();

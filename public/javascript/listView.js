// TODO: Implement setting variance
$(document).ready(() => {
    $.get('https://1b662c15.us-south.apigw.appdomain.cloud/park-easy-data/location', (data) => {
        if (!data.success) {
            // Cannot retrieve locations
            M.toast({ html: 'Location server undre maintenance, please come back later!' })
            return
        }
        const locationData = data.locations
        showLocations(data)
    })
})

const showLocations = (data) => {
    // TODO: NOT IN MAP
    // add loading effect

    // Wait for user location data
    if (!userCoordinates) {
        setTimeout(() => {
            showLocations(data)
        }, 200)
        return
    }
    data.locations.forEach(location => {
        $('.collection').append($('#template-collection-item').html())
        let element = $('.collection').children().last()
        element.find('img').click(zoomImage)
        element.find('span').html(location.title)
        element.find('p').html(
            location.baysAvailable + '/' + location.bays + ' spots' +
            '<br>' +
            Utility.getDistance(userCoordinates.latitude, userCoordinates.longitude, location.coordinates[1], location.coordinates[0])
        )
        element.find('a').attr('href', 'https://www.google.com/maps/dir/?api=1&destination=' + location.coordinates[1] + ',' + location.coordinates[0] + '&travelmode=driving')
    })
}

const zoomImage = (obj) => {
	// TODO: NOT IN MVP
	// Undo function extraction
	// Update image src
	$('.modal').find('img').attr('src', obj.target.currentSrc).css('width', '100%')
	$('.modal').modal('open')
}

const form = document.getElementById('vote-form');

form.addEventListener('submit', (e) => {
    const choice = document.querySelector('input[name=club]:checked').value;
    const data = {
        club: choice
    };
    $.ajax({
        method: 'POST',
        url: '/poll',
        data: data
    })
    e.preventDefault();
});

$.get('/poll', (data) => {
    const votes = data.votes;
    const totalVotes = votes.lenght;
    const voteCounts = votes.reduce((acc, vote) => {
        
    });
});

let points = [
    { label: 'FC Barcelona', y: 0 },
    { label: 'Real Madrid CF', y: 0 },
    { label: 'Manchester United FC', y: 0 },
    { label: 'Chelsea FC', y: 0 },
    { label: 'Arsenal FC', y: 0 },
    { label: 'Juventus FC', y: 0 },
    { label: 'FC Bayern Munich', y: 0 },
]

const chartContainer = document.getElementById('chart-container');

if (chartContainer){
    const chart = new CanvasJS.Chart('chart-container', {
        animationEnabled: true,
        theme: 'theme1',
        title: {
            text: 'Voting results'
        },
        data: [
            {
                type: 'column',
                dataPoints: points
            }
        ]
    });
    chart.render();

    Pusher.logToConsole = true;

    var pusher = new Pusher('224f08dea179306d4b56', {
      cluster: 'eu',
      forceTLS: true
    });

    var channel = pusher.subscribe('club-poll');
    channel.bind('club-vote', function(data) {
        points = points.map(club => {
            if(club.label == data.club){
                club.y += data.points;
                return club;
            } else {
                return club;
            }
        });
        chart.render();
    });
}
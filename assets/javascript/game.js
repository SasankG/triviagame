 var questionList = [
        {
            q: "A dog is a type of...",
            a: ["fish", "mammal", "plant", "prokaryote"],
            answer: 1
        },
        {
            q: "A cat is a type of...",
            a: ["mammal", "fish", "plant", "amphibian"],
            answer: 0
        },
        {
            q: "A tree is a type of...",
            a: ["plant", "fish", "mammal", "none"],
            answer: 0
        },
        {
            q: "What do cars run on?",
            a: ["gasoline", "water", "ethanol", "liquid oxygen"],
            answer: 0
        },
        {
            q: "What is 4 x 4?",
            a: ["8", "16", "4", "160"],
            answer: 1
        },
        {
            q: "What is the capital of Australia?",
            a: ["Brisbane", "GoldCoast", "Perth", "Canberra", "Melbourne"],
            answer: 3
        },
        {
            q: "What is the national flower of Canada?",
            a: ["sunflower", "daisy", "trillium", "rose", "lotus"],
            answer: 2
        },
        {
            q: "What is the meaning of Life?",
            a: ["10", "LMAO", "42", "lief", "yes"],
            answer: 2
        },
        {
            q: "The Canadian government is Liberal?",
            a: ["yes", "no"],
            answer: 0
        },
        {
            q: "The first month of the year is January",
            a: ["true", "false"],
            answer: 0
        },
        {
            q: "The talles building in the world is located in China",
            a: ["true", "false"],
            answer: 1
        },
        {
            q: "The TAR aka the Tibetan Autonomous Region belongs to which country?",
            a: ["Russia", "India","China","Nepal"],
            answer: 2
        },
        {
            q: "Damascus layered steel originated from which country? ",
            a: ["Syria", "Korea", "China", "Israel"],
            answer: 0
        },
        {
            q: "The most powerful volcanicn eruption to date was which?",
            a: ["Vesuvius", "Fuji","Kilauea","Krakatoa"],
            answer: 3
        },
        {
            q: "THe most purified form of Japanese green tea is called...",
            a: ["Hojicha", "Sencha","Macha","Tencha"],
            answer: 2
        },
        {
            q: "The ancient religion Buddhism orignated from which country?",
            a: ["India", "China","Japan","Korea"],
            answer: 0
        }
    ];
    //--------------------------------------
    var starter;
    //intro screen
    function intro() {
        $("#ca").text("Welcome to Trivia, you have 30 seconds to answer as many Q's as you can! We will start in 10 seconds!");
        $('#list').hide();
        starter = setInterval(start, 10000);
    }
    intro();
    function start() {
        clearInterval(starter);
        $('#list').show();
        $("#ca").text("");
        var picked;
        var qcount = 0;
        var output = [];
        var timer;
        var gameDone = false;
        var timeLeft = 30;
        var correctQ = 0;
        var wrongQ = 0;
        //var randomQ = Math.floor(Math.random()*7);
        var x = questionList[qcount];
        var j = x.answer;
        // var cAns = x.a[j];
        //console.log(cAns);
        console.log(j);
        timer = setInterval(time, 1000);
        //new Q w/ options
        function qGen() {
            $('#question').text(x.q);
            for (var i = 0; i < (x.a).length; i++) {
                var newLi = $('<button>');
                newLi.attr('data-id', i);
                newLi.addClass("btn btn-primary").text(x.a[i]);
                $('#list').append(newLi);
            }
        }
        qGen();
        // correct answer
        function clickChoice() {
            $('#list').on("click", 'button', function () {
                picked = parseInt($(this).attr("data-id"));
                console.log(picked + "    click");
                if (picked === j) {
                    console.log(j + "    if");
                    qcount++;
                    x = questionList[qcount];
                    j = x.answer;
                    qGen();
                    correct();
                } else {
                    qcount++;
                    incorrect();
                    x = questionList[qcount];
                    j = x.answer;
                    qGen();
                }
            })
        }
        clickChoice();
        //finish after all questions are answered
        function finishGame() {
            if (qcount === questionList.length) {
                endG();
            }
        }
        //timer
        function time() {
            timeLeft--;
            $('#time').text("You have " + timeLeft + " seconds Left!");
            if (timeLeft === 0) {
                $('#score').text('TIME UP');
                clearInterval(timer);
                endG();
            }
        }
        //correct
        function correct() {
            $("#list").text("");
            correctQ++;
            nextQ();
        }
        //incorrect
        function incorrect() {
            $("#list").text("");
            wrongQ++;
            nextQ();
        }
        //next question gen
        function nextQ() {
            $('#score').text("");
            $('#ca').text("");
            $('#question').text(x.q);
            $("#list").text("");
            qGen();
        }
        //end game
        function endG() {
            clearInterval(timer);
            $('#question').hide();
            $('#time').hide();
            $('#score').hide();
            $("#list").hide();
            $('#ca').text("GAME FINISHED");
            $('#wrong').text("Heres how many questions you got wrong:  " + wrongQ);
            $('#correct').text("Heres how many questions you got right:  " + correctQ);
        }
    };
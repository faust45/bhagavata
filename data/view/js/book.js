var chapters = [
"Кришна спасает Нанду и гибель Шанкхачуды",
"Женщины Враджи признаются друг другу в любви к Кришне",
"Схватка Кришны с быком Ариштою — 39",
"Смерть Кешина и Вьомы",
"Посольство Акруры",
"Кришна покидает Вриндавану",
"Восторг Акруры",
"Поход Кришны в Матхуру",
"Кришна ломает лук Шивы", 
"Схватка со слоном",
"Смерть Камсы",
"Ученичество Кришны",
"Посольство Уддхавы",
"Любовное признание шмелю",
"Новое поручение Акруре",
"Посольство Акруры к Пандавам",
"Исход Калии из страны змеев",
"Сон Мучукунды",
"Царевна Рукмини пишет послание Кришне",
"Кришна похищает Рукмини",
"Свадьба Кришны и Рукмини",
"Сказание о Прадьюмне",
"Кришна и драгоценный камень Шьямантака",
"Смерть Сатраджита и бегство Акруры",
"Кришна женится на пяти царевнах",
"Нанда поверяет пастухам пророчества Гарги",
"Кришна потешается над Рукмини",
"Баларама убивает Рукми",
"Любовь Уши и Анируддхи",
"Кришна сражается с Баною"
];

var times = {
    Lections:  prepareTimes(["56:17","9:58","32:57","01:22:40","50:07","01:23:42","04:01:53","51:48","29:41","45:46","01:29:30","01:10:45","02:04:48","02:14:21","04:28:52","08:49","31:52","02:44:56","13:42","59:27","01:09:18","01:48:18","01:44:52","01:17:36","57:15","02:31:21","02:07:18","46:02","16:58","04:39:30"]),
    AudioBook: prepareTimes(["10:59","12:18","13:27","13:18","16:03","21:41","11:32","17:45","12:31","14:50","19:41","17:42","18:52","30:59","15:01","11:25","21:51","21:20","16:37","16:18","17:52","12:55","16:12","13:30","17:57","18:19","24:38","13:32","13:38","19:38"])
}
             
var notes;

$(function() {
  notes = readNotes($('#book10_notes'));

  routes({
    "Lections":  loadLections,
    "AudioBook": loadAudioBook,
    "Lections/:chapter":  loadLections,
    "AudioBook/:chapter": loadAudioBook
  });

  function loadLections(params)  { Page('Lections', params.chapter); }
  function loadAudioBook(params) { Page('AudioBook', params.chapter); }
});

//------------------------------------------------------------------


Page = function(type, chapterNum) {
  if (!chapterNum) {
    chapterNum = 33;
  }

  var strChapterNum = chapterNum.toString();
  if(strChapterNum.length == 1) {
    strChapterNum = "0" + strChapterNum;
  }

  var folder;

  if (type == 'Lections') {
    folder = "2_lections_book10.2"
  } else {
    folder = "1_audio_book10.2"
  }

  var prefix = (type == 'Lections' ? 'BharatiMJ_' : '');
  var filePath = "../audio/{{folder}}/{{prefix}}SB_book{{bookNum}}_chapter{{chapterNum}}.mp3"
                 .re({bookNum: 10, folder: folder, chapterNum: strChapterNum, prefix: prefix});

  var switchButton = $('a[href=#'+type+'/1]'); 
      nav = $('#nav ul'),
      notesUl  = $('#notes ul'),
      img      = $('#image img'),
      title    = $('#title');


  $('#top_menu a').removeClass('active');
  switchButton.addClass('active');

  nav.html('');
  $.each(chapters, function(i) {
      var html = '<li><a href="#{{type}}/{{i}}"><b></b><i></i>{{i}}</a></li>'
                 .re({type: type, i: i + 34});
      nav.append($(html));
  });

  goChapter(chapterNum);

  function goChapter(i) {
      //changeNote();
      changeTrack();
      changeImage();
      changeTitle();

      function changeTrack() {
          if (isPlayerExists()) {
              removePlayer();
          }

          var file = filePath;
          addPlayer(file, times[type][i - 1] * 1000);
      }

      function changeTitle() {
          title.html('Глава ' + i + '.&nbsp;&nbsp;' + chapters[i - 1]);
      }

      function changeNote() {
        notesUl.html('');
        if (type == "Lections") {
            var arr = notes[i - 1].split('\n')
            $.each(arr, function(i) {
              var m = arr[i].match(/(\d+:\d+(:\d+)?)(.*)/);
              var time = RegExp.$1, title = RegExp.$3;

              if (m) {
                var li = $('<li><span>'+time+'</span>'+title+'</li>');
              } else {
                var li = $('<li><span></span>'+arr[i]+'</li>');
              }

              notesUl.append(li);
            });
        }
      }

      function changeImage() {
          img.attr('src', 'images/SB10images/' + i + '.jpg');
          //this.img.jScale({ls:'600px'});
      }
  }

  function isPlayerExists() {
    return $('#line').size() != 0;
  }

  function removePlayer() {
    $('#line').remove();
  }
}

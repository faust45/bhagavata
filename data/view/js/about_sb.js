var notesAbout;

function buildUlNotes(ul, notes) {
    ul.html('');
    $.each(notes, function(i) {
        var m = notes[i].match(/(\d+:\d+(:\d+)?)(.*)/);
        var time = RegExp.$1, title = RegExp.$3;

        if (m) {
            var li = $('<li><span>'+time+'</span>'+title+'</li>');
        } else {
            var li = $('<li><span></span>'+arr[i]+'</li>');
        }

        ul.append(li);
    });
}


$(document).ready(function() {
  notesAbout = readNotes($('#aboutSbNotes'));
  var page = new Page();

  page.goChapter(0);


  function readNotes(el) {
    var text = el.html()
    .replace(/^\s+/g, '')
    .replace(/\s+$/g, '')
    .replace(/\,\n/g, ',')
    .replace(/\n/g, '|')
    .replace(/^\|/, '')
    .replace(/\|$/, '');

    return eval('(['+ text +'])');
  }
});

//------------------------------------------------------------------


Page = function() {
  var self = this;
  this.titles = ["Родословная дочерей ману Сваямбхувы" , "Дакша проклинает Шиву", "Беседа Шивы и Сати", "Сати оставляет тело", "Конец жертвенного таинства", "Брахма увещевает Шиву", "Дакша завершает жертвоприношение", "Царевич Дхрува уходит в лес", "Дхрува возвращается в отчий дом", "Дхрува сражается с лесными бесами", "Mану дает наставления внуку", "Исход Дхрувы в царство Всевышнего", "Потомки Дхрувы", "Царствие Вены", "Рождение святого царя Притху", "Певцы прославляют Притху ", "Притху гневается на Землю", "Притху доит кормилицу-Землю ", "Сотое жертвоприношение", "Господь примиряет Притху и Индру", "Наставления царя Притху", "Встреча Притху и четырех юных старцев", "Исход царя Притху", "Молитва Шивы", "Притча о царе Пуранджане", "Царская охота", "Нападение Чандавеги на город Пуранджаны", "Пуранджана рождается женщиной", "Нарада разъясняет притчу", "Конец покаянию Прачетов", "Нарада дает наставления Прачетам"];
  this.times = [4934, 5284, 4098];
  this.chapters = $('#nav').find('li');
  this.notes    = $('#notes').find('ul');
  this.img      = $('#image').find('img');
  this.title    = $('#title');

  this.chapters.each(function(num) {
    var li = $(this);
    li.click(function() {
      self.goChapter(num);
      return false;
    });
  });
}


Page.prototype = {
  currentNote: null,
  filePath: "../audio/3_about_sb/statja_Bhaktivinoda_Thakura_O_Bhagavatam_part{{num}}.mp3",

  goChapter: function(num) {
    this.changeTrack(num);
    this.changeNote(num);
    this.changeImage(num);
    this.changeTitle(num);
  },

  changeTrack: function(num, rawNum) {
    if (this.isPlayerExists()) {
      this.removePlayer();
    }

    var file = this.filePath.replace('{{num}}', num + 1); 
    addPlayer(file, this.times[num] * 1000);
  },

  changeTitle: function(num, rawNum) {
    var title   = this.titles[num];
    var chapter = num + 1;

    var title = 'Чтение статьи Шрилы Бхактивинода Тхакура<br /> "БХАГАВАТА-ПУРАНА. Её философия, этика и теология", часть ' + chapter;
    this.title.html(title);
  },

  changeNote: function(num) {
    buildUlNotes(this.notes, notesAbout[num].split('|'));
  },

  changeImage: function(num) {
    this.img.attr('src', 'images/about_sb/small/' + (num + 1) + '.jpg');
    //this.img.jScale({ls:'600px'});
  },
 
  isPlayerExists: function() {
    return $('#line').size() != 0;
  },

  removePlayer: function() {
    $('#line').remove();
  }
}

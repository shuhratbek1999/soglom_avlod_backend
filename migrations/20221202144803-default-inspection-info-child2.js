'use strict';

var dbm;
var type;
var seed;
const sequelize = require('../src/db/db-sequelize')
/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function() {
  return sequelize.query(
   "INSERT INTO `inspection_info_child2` (`id`, `code`, `name`, `info_child_id`) VALUES \
   (1, 'H00.0', 'Гордеолум и другие глубокие воспаления век', 0),\
   (2, 'H00.1', 'Гордеолум и другие глубокие воспаления век', 0),\
   (3, 'H01.8', 'Гордеолум и другие глубокие воспаления век', 1),\
   (4, 'H00.9', 'Халазион', 1),\
   (5, 'H01.9', ' Блефарит', 2),\
   (6, 'H02.0', 'Неинфекционные дерматозы века', 2),\
   (7, 'H02.0', 'Другие воспаления века уточненные', 2),\
   (8, 'H02.1', 'Воспаление века неуточненное', 2),\
   (9, 'H02.2', 'Энтропион и трихиаз века', 3),\
   (10, 'H02.3', 'Эктропион века', 3),\
   (11, 'H02.4', 'Лагофтальм', 3),\
   (12, 'H02.5', 'Блефарохалазис', 3),\
   (13, 'H02.6', 'Другие болезни, нарушающие функцию века', 3),\
   (14, 'H02.7','Ксантелазма века', 3),\
   (15, 'H02.8', 'Другие дегенеративные болезни века и окологлазной области', 3),\
   (16, 'H02.9', 'Другие уточненные болезни века', 3),\
   (17, 'H03.0', 'Болезнь века неуточненная', 3),\
   (18, 'H03.1', 'Паразитарные болезни века при болезнях, классифицированных в других рубриках', 4),\
   (19, 'H03.8', 'Поражения века при других инфекционных болезнях, классифицированных в других рубриках', 4),\
   (20, 'H04.0', 'Поражения века при других болезнях, классифицированных в других рубриках', 4),\
   (21, 'H04.1', 'Дакриоденит', 5),\
   (22, 'H04.2','Другие болезни слезной железы', 5),\
   (23, 'H04.3', 'Эпифора', 5),\
   (24, 'H04.4', 'Острое и неуточненное воспаление слезных протоков', 5),\
   (25, 'H04.5', 'Хроническое воспаление слезных протоков', 5),\
   (26, 'H04.6', 'Стеноз и недостаточность слезных протоков', 5),\
   (27, 'H04.8', 'Другие болезни слезного аппарата', 5),\
   (28, 'H04.9', 'Болезнь слезного аппарата неуточненная', 5),\
   (29, 'H05.0', 'Другие изменения слезных протоков', 5),\
   (30, 'H05.1', 'Острое воспаление глазницы', 6),\
   (31, 'H05.2', 'Хронические воспалительные болезни глазницы', 6),\
   (32, 'H05.3', 'Экзофтальмические состояния', 6),\
   (33, 'H05.4', 'Деформация глазницы', 6),\
   (34, 'H05.5', 'Энофтальм', 6),\
   (35, 'H05.8', 'Неудаленное давно попавшее в глазницу тело вследствие проникающего ранения глазницы', 6),\
   (36, 'H05.9', 'Другие болезни глазницы', 6),\
   (37, 'H06.0', 'Болезнь глазницы неуточненная', 6),\
   (38, 'H06.1', 'Болезнь глазницы неуточненная', 0),\
   (39, 'H06.2', 'Поражения слезного аппарата при болезнях, классифицированных в других рубриках', 7),\
   (40, 'H06.3', 'Паразитарная инвазия глазницы при болезнях, классифицированных в других рубриках', 7),\
   (41, 'H10.0', 'Экзофтальм при нарушении функции щитовидной железы (Е05. -)', 7),\
   (42, 'H10.1', 'Другие поражения глазницы при болезнях, классифицированных в других рубриках', 7),\
   (43, 'H10.2', 'Другие поражения глазницы при болезнях, классифицированных в других рубриках', 0),\
   (44, 'H10.0', 'Слизисто-гнойный конъюнктивит', 8),\
   (45, 'H10.1', 'Острый атопический конъюнктивит', 8),\
   (46, 'H10.2', 'Другие острые конъюнктивиты', 8),\
   (47, 'H10.3', 'Острый конъюнктивит неуточненный', 8),\
   (48, 'H10.4', 'Хронический конъюнктивит', 8),\
   (49, 'H10.5', 'Блефароконъюнктивит', 8),\
   (50, 'H10.8', 'Другие конъюнктивиты', 8),\
   (51, 'H10.9', 'Конъюнктивит неуточненный', 8),\
   (52, 'H11.0', 'Птеригий', 9),\
   (53, 'H11.1', 'Конъюнктивальные перерождения и отложения', 9),\
   (54, 'H11.2', 'Рубцы конъюнктивы', 9),\
   (55, 'H11.3', 'Конъюнктивальное кровоизлияние', 9),\
   (56, 'H11.4', 'Другие конъюнктивальные васкулярные болезни и кисты', 9),\
   (57, 'H11.8', 'Другие уточненные болезни конъюнктивы', 9),\
   (58, 'H11.9', 'Болезнь конъюнктивы неуточненная', 9),\
   (59, 'H13.0', 'Филярийная инвазия конъюнктивы (В74. -)', 10),\
   (60, 'H13.1', 'Острый конъюнктивит при болезнях, классифицированных в других рубриках', 10),\
   (61, 'H13.2', 'Конъюнктивит при болезнях, классифицированных в других рубриках', 10),\
   (62, 'H13.3', 'Глазной пемфигоид (L12. -)', 10),\
   (63, 'H13.8', 'Глазной пемфигоид (L12. -)', 0),\
   (64, 'H13.8', 'Другие поражения конъюнктивы при болезнях, классифицированных в других рубриках', 10),\
   (65, 'H15.0', 'Склерит', 11),\
   (66, 'H15.1', 'Эписклерит', 11),\
   (67, 'H15.8', 'Другие поражения склеры', 11),\
   (68, 'H15.9', 'Болезнь склеры неуточненная', 11),\
   (69, 'H16.0', 'Язва роговицы', 12),\
   (70, 'H16.1', 'Другие поверхностные кератиты без конъюнктивита', 12),\
   (71, 'H16.2', 'Кератоконъюнктивит', 12),\
   (72, 'H16.3', 'Интерстициальный (стромальный) и глубокий кератит', 12),\
   (73, 'H16.4', 'Неоваскуляризация роговицы', 12),\
   (74, 'H16.8', 'Другие формы кератита', 12),\
   (75, 'H16.9', 'Кератит неуточненный', 12),\
   (76, 'H17.0', 'Другие центральные помутнения роговицы', 13),\
   (77, 'H17.1', 'Другие рубцы и помутнения роговицы', 13),\
   (78, 'H17.8', 'Рубцы и помутнения роговицы неуточненные', 13),\
   (79, 'H18.0', 'Пигментация и отложения в роговице', 14),\
   (80, 'H18.1', 'Буллезная кератопатия', 14),\
   (81, 'H18.2', 'Другие отеки роговицы', 14),\
   (82, 'H18.3', 'Изменения оболочек роговицы', 14),\
   (83, 'H18.4', 'Дегенерация роговицы', 14),\
   (84, 'H18.5', 'Наследственная дистрофия роговицы', 14),\
   (85, 'H18.6', 'Кератоконус', 14),\
   (86, 'H18.7', 'Другие деформации роговой оболочки', 14),\
   (87,'H18.8',  'Другие уточненные болезни роговицы', 14),\
   (88, 'H18.9', 'Болезнь роговицы неуточненная', 14),\
   (89, 'H19.0', 'Склерит и эписклерит при болезнях, классифицированных в других рубриках', 15),\
   (90, 'H19.1', 'Кератит, обусловленный вирусом простого герпеса, и кератоконъюнктивит (В00.5)', 15),\
   (91, 'H19.2', 'Кератит и кератоконъюнктивит при других инфекционных и паразитарных болезнях, классифицированных в других рубриках', 15),\
   (92, 'H19.3', 'Кератит и кератоконъюнктивит при болезнях, классифицированных в других рубриках', 15),\
   (93, 'H19.8', 'Другие поражения склеры и роговицы при болезнях, классифицированных в других рубриках', 15),\
   (94, 'H20.0', 'Острый и подострый иридоциклит', 16),\
   (95, 'H20.1', 'Хронический иридоциклит', 16),\
   (96, 'H20.2', 'Иридоциклит, вызванный линзами', 16),\
   (97, 'H20.8', 'Другие иридоциклиты', 16),\
   (98, 'H20.9', 'Иридоциклит неуточненный', 16),\
   (99, 'H21.0', 'Гифема', 17),\
   (100, 'H21.1', 'Другие сосудистые болезни радужной оболочки и цилиарного тела', 17),\
   (101, 'H21.2', 'Дегенерация радужной оболочки и цилиарного тела', 17),\
   (102, 'H21.3', 'Киста радужной оболочки, цилиарного тела и передней камеры глаза', 17),\
   (103, 'H21.4', 'Зрачковые мембраны', 17),\
   (104, 'H21.5', 'Другие виды спаек и разрывов радужной оболочки и цилиарного тела', 17),\
   (105, 'H21.8', 'Другие уточненные болезни радужной оболочки и цилиарного тела', 17),\
   (106, 'H21.9', 'Болезнь радужной оболочки и цилиарного тела неуточненная', 17),\
   (107, 'H22.0', 'Иридоциклит при инфекционных болезнях, классифицированных в других рубриках', 18),\
   (108, 'H22.1', 'Иридоциклит при болезнях, классифицированных в других рубриках', 18),\
   (109, 'H22.8', 'Другие поражения радужной оболочки и цилиарного тела при болезнях, классифицированных в других рубриках', 18),\
   (110, 'H25.0', 'Начальная старческая катаракта', 19),\
   (111, 'H25.1', 'Старческая ядерная катаракта', 19),\
   (112, 'H25.2', 'Старческая морганиева катаракта', 19),\
   (113, 'H25.8', 'Другие старческие катаракты', 19),\
   (114, 'H25.9', 'Старческая катаракта неуточненная', 19),\
   (115, 'H26.0', 'Детская, юношеская и пресенильная катаракта', 20),\
   (116, 'H26.1', 'Травматическая катаракта', 20),\
   (117, 'H26.2', 'Осложненная катаракта', 20),\
   (118, 'H26.3', 'Катаракта, вызванная лекарственными средствами', 20),\
   (119, 'H26.4', 'Вторичная катаракта', 20),\
   (120, 'H26.8', 'Другая уточненная катаракта', 20),\
   (121, 'H26.9', 'Катаракта неуточненная', 20),\
   (122, 'H27.0', 'Афакия', 21),\
   (123, 'H27.1', 'Вывих хрусталика', 21),\
   (124, 'H27.8', 'Другие уточненные болезни хрусталика', 21),\
   (125,'H27.9',  'Болезнь хрусталика неуточненная', 21),\
   (126, 'H28.0', 'Диабетическая катаракта (Е10-Е14 с общим четвертым знаком .3)', 22),\
   (127, 'H28.1', 'Катаракта при других болезнях эндокринной системы, расстройствах питания и нарушениях обмена веществ, классифицированных в других рубриках', 22),\
   (128, 'H28.2', 'Катаракта при других болезнях, классифицированных в других рубриках', 22),\
   (129, 'H28.8', 'Другие поражения хрусталика при болезнях, классифицированных в других рубриках', 22),\
   (130, 'H50.0', 'Очаговое хориоретинальное воспаление', 23),\
   (131, 'H50.1', 'Диссеминированное хориоретинальное воспаление', 23),\
   (132, 'H50.2', 'Задний циклит', 23),\
   (133, 'H50.8', 'Другие хориоретинальные воспаления', 23),\
   (134, 'H50.9', 'Хориоретинальное воспаление неуточненное', 23),\
   (135, 'H51.0', 'Хориоретинальные рубцы', 24),\
   (136, 'H51.1', 'Дегенерация сосудистой оболочки глаза', 24),\
   (137, 'H51.2', 'Наследственная дистрофия сосудистой оболочки глаза', 24),\
   (138, 'H51.3', 'Кровоизлияние и разрыв сосудистой оболочки глаза', 24),\
   (139, 'H51.4', 'Отслойка сосудистой оболочки глаза', 24),\
   (140, 'H51.8', 'Другие уточненные болезни сосудистой оболочки глаза', 24),\
   (141, 'H51.9', 'Болезнь сосудистой оболочки неуточненная', 24),\
   (142, 'H52.0', 'Хориоретинальное воспаление при инфекционных и паразитарных болезнях, классифицированных в других рубриках', 25),\
   (143, 'H52.8', 'Другие хориоретинальные нарушения при болезнях, классифицированных в других рубриках', 25),\
   (144, 'H53.0', 'Отслойка сетчатки с разрывом сетчатки', 26),\
   (145, 'H53.1', 'Ретиношизис и ретинальные кисты', 26),\
   (146, 'H53.2', 'Серозная отслойка сетчатки', 26),\
   (147, 'H53.3', 'Ретинальные разрывы без отслойки сетчатки', 26),\
   (148, 'H53.4', 'Тракционная отслойка сетчатки', 26),\
   (149, 'H53.5', 'Другие формы отслойки сетчатки', 26),\
   (150, 'H54.0', 'Преходящая ретинальная артериальная окклюзия', 27),\
   (151, 'H54.1', 'Центральная ретинальная артериальная окклюзия', 27),\
   (152, 'H54.2', 'Другие ретинальные артериальные окклюзии', 27),\
   (153, 'H54.8', 'Другие ретинальные сосудистые окклюзии', 27),\
   (154, 'H54.9', 'Ретинальная васкулярная окклюзия неуточненная', 27),\
   (155, 'H55.0', 'Фоновая ретинопатия и ретинальные сосудистые изменения', 28),\
   (156, 'H55.1', 'Преретинопатия', 28),\
   (157, 'H55.2', 'Другая пролиферативная ретинопатия', 28),\
   (158, 'H55.3', 'Дегенерация макулы и заднего полюса', 28),\
   (159, 'H55.4', 'Периферическая ретинальная дегенерация', 28),\
   (160, 'H55.5', 'Наследственные ретинальные дистрофии', 28),\
   (161, 'H55.6', 'Ретинальное кровоизлияние', 28),\
   (162, 'H55.7', 'Другие уточненные ретинальные нарушения', 28),\
   (163, 'H55.8', 'Болезнь сетчатки неуточненная', 28),\
   (164, 'H55.9', 'Диабетическая ретинопатия (Е10-Е14 с общим четвертым знаком .3)', 29),\
   (165, 'H56.0', 'Другие ретинальные нарушения при болезнях, классифицированных в других рубриках', 29),\
   (166, 'H56.8', 'Подозрение на глаукому', 30),\
   (167, 'H50.0', 'Первичная открытоугольная глаукома', 30),\
   (168, 'H50.1', 'Первичная закрытоугольная глаукома', 30),\
   (169, 'H50.2', 'Глаукома вторичная посттравматическая', 30),\
   (170, 'H50.3', 'Глаукома вторичная вследствие воспалительного заболевания глаза', 30),\
   (171, 'H50.4', 'Глаукома вторичная вследствие других болезней глаз', 30),\
   (172, 'H50.5', 'Глаукома вторичная, вызванная приемом лекарственных средств', 30),\
   (173, 'H50.6', 'Другая глаукома', 30),\
   (174, 'H50.8', 'Глаукома неуточненная', 30),\
   (175, 'H50.9', 'Глаукома при болезнях эндокринной системы, расстройствах питания и нарушениях обмена веществ', 31),\
   (176, 'H50.9', 'Глаукома при других болезнях, классифицированных в других рубриках', 31),\
   (177, 'H53.0', 'Выпадение стекловидного тела (пролапс)', 32),\
   (178, 'H53.1', 'Кровоизлияние в стекловидное тело', 32),\
   (179, 'H53.2', 'Кристаллические отложения в стекловидном теле', 32),\
   (180, 'H53.3', 'Другие помутнения стекловидного тела', 32),\
   (181, 'H53.8', 'Другие болезни стекловидного тела', 32),\
   (182, 'H53.9', 'Болезнь стекловидного тела неуточненная', 32),\
   (183, 'H54.0', 'Гнойный эндофтальмит', 33),\
   (184, 'H54.1', 'Другие эндофтальмиты', 33),\
   (185, 'H54.2', 'Дегенеративная миопия', 33),\
   (186, 'H54.3', 'Другие дегенеративные болезни глазного яблока', 33),\
   (187, 'H54.4', 'Дегенеративные состояния глазного яблока', 33),\
   (188, 'H54.5', 'Неудаленное (давно попавшее в глаз) магнитное инородное тело', 33),\
   (189, 'H54.6', 'Неудаленное (давно попавшее в глаз) немагнитное инородное тело', 33),\
   (190, 'H54.7', 'Другие болезни глазного яблока', 33),\
   (191, 'H54.8', 'Болезнь глазного яблока неуточненная', 33),\
   (192, 'H55.0', 'Кровоизлияние в стекловидное тело при болезнях, классифицированных в других рубриках', 34),\
   (193, 'H55.1', 'Эндофтальмит при болезнях, классифицированных в других рубриках', 34),\
   (194, 'H55.8', 'Другие поражения стекловидного тела и глазного яблока при болезнях, классифицированных в других рубриках', 34),\
   (195, 'H57.0', 'Болезни зрительного нерва, не классифицированные в других рубриках', 36),\
   (196, 'H57.1', 'Отек диска зрительного нерва неуточненный', 36),\
   (197, 'H57.2', 'Атрофия зрительного нерва', 36),\
   (198, 'H57.3', 'Другие болезни зрительного нерва', 36),\
   (199, 'H57.4', 'Поражения перекрестка зрительных нервов', 36),\
   (200, 'H57.5', 'Поражения других отделов зрительных путей', 36),\
   (201, 'H57.6', 'Поражения зрительной корковой области', 36),\
   (202, 'H57.7', 'Болезни зрительных проводящих путей неуточненные', 36),\
   (203, 'H58.0', 'Атрофия зрительного нерва при болезнях, классифицированных в других рубриках', 37),\
   (204, 'H58.1', 'Ретробульбарный неврит при болезнях, классифицированных в других рубриках', 37),\
   (205, 'H58.8', 'Другие поражения зрительного нерва и зрительных путей при болезнях, классифицированных в других рубриках', 37),\
   (206, 'H59.0', 'Паралич 3-го (глазодвигательного) нерва', 38),\
   (207, 'H59.1', 'Паралич 4-го (блокового) нерва', 38),\
   (208, 'H59.2', 'Паралич 6-го (отводящего) нерва', 38),\
   (209, 'H59.3', 'Полная (наружная) офтальмоплегия', 38),\
   (210, 'H59.4', 'Прогрессирующая наружная офтальмоплегия', 38),\
   (211, 'H59.8', 'Другие паралитические косоглазия', 38),\
   (212, 'H59.9', 'Паралитическое косоглазие неуточненное', 38),\
   (213, 'H50.0', 'Сходящееся содружественное косоглазие', 39),\
   (214, 'H50.1', 'Расходящееся содружественное косоглазие', 39),\
   (215, 'H50.2', 'Вертикальное косоглазие', 39),\
   (216, 'H50.3', 'Перемежающаяся гетеротропия', 39),\
   (217, 'H50.4', 'Другие и неуточненные гетеротропии', 39),\
   (218, 'H50.5', 'Гетерофория', 39),\
   (219, 'H50.6', 'Механическое косоглазие', 39),\
   (220, 'H50.8', 'Другие уточненные виды косоглазия', 39),\
   (221, 'H50.9', 'Косоглазие неуточненное', 39),\
   (222, 'H51.0', 'Паралич взора', 40),\
   (223, 'H51.1', 'Недостаточность конвергенции (конвергенция недостаточная и избыточная)', 40),\
   (224, 'H51.2', 'Внутриядерная офтальмоплегия', 40),\
   (225, 'H51.8', 'Другие уточненные нарушения содружественного движения глаз', 40),\
   (226, 'H51.9', 'Нарушения содружественного движения глаз неуточненное', 40),\
   (227, 'H52.0', 'Гиперметропия', 41),\
   (228, 'H52.1', 'Миопия', 41),\
   (229, 'H52.2', 'Астигматизм', 41),\
   (230, 'H52.3', 'Анизометропия и анизейкония', 41),\
   (231, 'H52.4', 'Пресбиопия', 41),\
   (232, 'H52.5', 'Нарушения аккомодации', 41),\
   (233, 'H52.6', 'Другие нарушения рефракции', 41),\
   (234, 'H52.7', 'Нарушение рефракции неуточненное', 41),\
   (235, 'H53.0', 'Амблиопия вследствие анопсии', 42),\
   (236, 'H53.1', 'Субъективные зрительные расстройства', 42),\
   (237, 'H53.2', 'Диплопия', 42),\
   (238, 'H53.3', 'Другие нарушения бинокулярного зрения', 42),\
   (239, 'H53.4', 'Дефекты поля зрения', 42),\
   (240, 'H53.5', 'Аномалии цветового зрения', 42),\
   (241, 'H53.6', 'Ночная слепота', 42),\
   (242, 'H53.8', 'Другие расстройства зрения', 42),\
   (243, 'H53.9', 'Расстройство зрения неуточненное', 42),\
   (244, 'H54.0', 'Слепота обоих глаз', 43),\
   (245, 'H54.1', 'Слепота одного глаза, пониженное зрение другого глаза', 43),\
   (246, 'H54.2', 'Пониженное зрение обоих глаз', 43),\
   (247, 'H54.3', 'Неопределенная потеря зрения обоих глаз', 43),\
   (248, 'H54.4', 'Слепота одного глаза', 43),\
   (249, 'H54.5', 'Пониженное зрение одного глаза', 43),\
   (250, 'H54.6', 'Неопределенная потеря зрения одного глаза', 43),\
   (251, 'H54.7', 'Неуточненная потеря зрения', 43),\
   (252, 'H57.0', 'Аномалия зрачковой фракции', 45),\
   (253, 'H57.1', 'Глазная боль', 45),\
   (254, 'H57.8', 'Другие неуточненные болезни глаза и его придаточного аппарата', 45),\
   (255, 'H57.9', 'Нарушение глаза и его придаточного аппарата неуточненное', 45),\
   (256, 'H58.0', 'Аномалии зрачковой функции при болезнях, классифицированных в других рубриках', 46),\
   (257, 'H58.1', 'Нарушение зрения при болезнях, классифицированных в других рубриках', 46),\
   (258, 'H58.8', 'Другие нарушения глаза и его придаточного аппарата при болезнях, классифицированных в других рубриках', 46),\
   (259, 'H59.0', 'Синдром стекловидного тела после операции по поводу катаракты', 47),\
   (260, 'H59.8', 'Другие поражения глаза и его придаточного аппарата после медицинских процедур', 47),\
   (261, 'H59.9', 'Поражение глаза и его придаточного аппарата после медицинских процедур неуточненное', 47)\
   "
  );
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};

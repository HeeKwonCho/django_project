-- 1. "mini_project" schema 생성

-- 2. 
use mini_project;

-- 3. lecture_temp 테이블 생성
CREATE TABLE `lecture_temp` (
  `detail_link` varchar(500) DEFAULT NULL,
  `thumbnail` varchar(800) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `title` varchar(500) DEFAULT NULL,
  `field` varchar(200) DEFAULT NULL,
  `satisfaction` varchar(10) DEFAULT NULL,
  `language` varchar(50) DEFAULT NULL,
  `institution` varchar(300) DEFAULT NULL,
  `review_count` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3

-- 4. git-hub 소스 pull 받기

-- 5. C:\mini_project\Mini_project\data_upload.ipynb 실행

-- 6. python migration 수행

-- 7. 아래 순차적으로 수행

# 1. lecture_sites
insert into lecture_sites (site_name, site_url, created_at, updated_at)
values ('Udemy', 'https://www.udemy.com/', now(), now())
;
insert into lecture_sites (site_name, site_url, created_at, updated_at)
values ('Inflearn', 'https://www.inflearn.com/', now(), now())
;

# 2. lecture_lecturer
insert into lecture_lecturers (lecturer_name, created_at, updated_at)
select distinct lt.institution, now(), now()
from   lecture_temp lt
;

# 3. lecture_categories
# 3-1. Udemy level 1
insert into lecture_categories (cat_name, created_at, updated_at)
select distinct case when instr(lt.field, '/') = 0 then
                          lt.field
                     else substr(lt.field, 1, instr(lt.field, '/') - 1)
                end as cat
               ,now(), now() 
from   lecture_temp lt
where  instr(lt.detail_link, 'udemy') > 0
;
# 3-2. Inflearn level 1
insert into lecture_categories (cat_name, created_at, updated_at)
select distinct substr(substr(lt.field, 1, instr(lt.field, '>') - 1), 1, instr(lt.field, '/') - 1) as cat
               ,now(), now() 
from   lecture_temp lt
where  instr(lt.detail_link, 'inflearn') > 0
;
# level 2 는 포기

# 4. lecture_lectures
insert into lecture_lectures (site_id, category_id, lecturer_id, lec_title, lec_img_link, lec_link, rating, review_count, created_at, updated_at)
select (select ls.id
        from   lecture_sites ls
        where  instr(lt.detail_link, ls.site_url) > 0) as site_id
      ,(select lc.id
        from   lecture_categories lc
        where  case when instr(lt.detail_link, 'udemy') > 0 then
                         case when instr(lt.field, '/') = 0 then
                                   lt.field
                              else substr(lt.field, 1, instr(lt.field, '/') - 1)
                         end = lc.cat_name
                    else
                         substr(substr(lt.field, 1, instr(lt.field, '>') - 1), 1, instr(lt.field, '/') - 1) = lc.cat_name
               end) as category_id
      ,(select ll.id
        from   lecture_lecturers ll
        where  lt.institution = ll.lecturer_name) as lecturer_id
      ,lt.title
      ,lt.thumbnail
      ,lt.detail_link
      ,lt.satisfaction
      ,lt.review_count
      ,now()
      ,now() 
from   lecture_temp lt
;


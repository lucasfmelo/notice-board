package br.com.cers.noticeboard;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NoticeDAO extends PagingAndSortingRepository<Notice, Long>{
   
    
}

package br.com.cers.noticeboard;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class NoticeBoardService {

    Logger logger = LoggerFactory.getLogger(NoticeBoardService.class);

    @Autowired
    private NoticeDAO alertRepository;

    public List<Notice> getAll(Integer page, Integer size) {
        PageRequest pageRequest = PageRequest.of(page, size);
        return alertRepository.findAll(pageRequest).getContent();
    }

    public Notice getById(Long id) throws NotFoundException {
        Optional<Notice> alertOptional = alertRepository.findById(id);
        if (alertOptional.isPresent()) {
            this.insertOrUpdate(alertOptional.get());
            return alertOptional.get();
        }
        throw new NotFoundException(String.format("Aviso %s não encontrado", id));
    }

    @Transactional
    public Notice insertOrUpdate(Notice alert) {
        alert.setVisualizationDate(LocalDate.now());
        return alertRepository.save(alert);
    }

    @Transactional
    public void delete(Long id) throws NotFoundException {

        Optional<Notice> alert = alertRepository.findById(id);

        if (alert.isPresent()) {
            alertRepository.deleteById(id);
        } else {
            throw new NotFoundException(String.format("Aviso %s não encontrado.", id));
        }

    }

    public void delete(Long[] deleteList) {
        Arrays.asList(deleteList).forEach((id) -> {
            try {
                this.delete(id);
            } catch (NotFoundException ex) {
                logger.error(String.format("id %s não encontrado", id), ex);
            }
        });
    }

}

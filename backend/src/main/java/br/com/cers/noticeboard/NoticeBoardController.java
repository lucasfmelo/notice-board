package br.com.cers.noticeboard;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("notice")
public class NoticeBoardController {

    @Autowired
    private NoticeBoardService noticeService;

    @GetMapping
    public ResponseEntity<List<NoticeDTO>> findAll(@RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "5") Integer size) {

        List<Notice> list = noticeService.getAll(page, size);

        return new ResponseEntity<List<NoticeDTO>>(convertToDTO(list), new HttpHeaders(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<NoticeDTO> getById(@PathVariable("id") Long id) throws NotFoundException {
        Notice alert = noticeService.getById(id);
        return new ResponseEntity<NoticeDTO>(convertToDTO(alert), new HttpHeaders(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<NoticeDTO> insert(@Valid @RequestBody Notice alert) {
        Notice alertUpdated = noticeService.insertOrUpdate(alert);
        return new ResponseEntity<NoticeDTO>(convertToDTO(alertUpdated), new HttpHeaders(), HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<NoticeDTO> update(@Valid @RequestBody Notice alert) {
        Notice alertUpdated = noticeService.insertOrUpdate(alert);
        return new ResponseEntity<NoticeDTO>(convertToDTO(alertUpdated), new HttpHeaders(), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable("id") Long id) throws NotFoundException {
        noticeService.delete(id);
        return new ResponseEntity<>(new HttpHeaders(), HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("")
    public ResponseEntity deleteList(@RequestBody Long ids[]) throws BadRequestException {
        if (ids == null){
            throw new BadRequestException("Lista de ids vazia");
        }
        noticeService.delete(ids);
        return new ResponseEntity<>(new HttpHeaders(), HttpStatus.NO_CONTENT);
    }

    private NoticeDTO convertToDTO(Notice alert) {
        NoticeDTO dto = new NoticeDTO();
        dto.setId(alert.getId());
        dto.setDescription(alert.getDescription());
        dto.setTitle(alert.getTitle());
        dto.setPublishDate(alert.getPublishDate());
        dto.setVisualizationDate(alert.getVisualizationDate());
        return dto;
    }

    private List<NoticeDTO> convertToDTO(List<Notice> listAlert){
        List<NoticeDTO> lista = new ArrayList<>();
        listAlert.forEach( (alert) -> {
            NoticeDTO dto = new NoticeDTO();
            dto.setId(alert.getId());
            dto.setDescription(alert.getDescription());
            dto.setTitle(alert.getTitle());
            dto.setPublishDate(alert.getPublishDate());
            dto.setVisualizationDate(alert.getVisualizationDate());
            lista.add(dto);
        });
        return lista;
    }

}
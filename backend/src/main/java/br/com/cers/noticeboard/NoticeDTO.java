package br.com.cers.noticeboard;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import lombok.Data;

@Data
public class NoticeDTO {

    private Long id;

    @NotNull(message="Título não pode ser nulo.")
    @NotEmpty(message = "Título não pode ser vazio.")
    private String title;

    @NotNull(message="Descrição não pode ser nula.")
    @NotEmpty(message = "Descrição não pode ser vazia.")
    private String description;

    @NotNull(message="Data de publicacao não pode ser nula.")
    @Column(columnDefinition = "DATE", name="PUBLISH_DATE")
    private LocalDate publishDate;

    @Column(columnDefinition = "DATE", name="VISUALIZATION_DATE")
    private LocalDate visualizationDate;


    
}

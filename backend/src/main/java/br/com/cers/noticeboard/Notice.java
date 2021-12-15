package br.com.cers.noticeboard;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import lombok.Data;

@Entity
@Data
public class Notice {

    @Id
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="notice_sequence")
    @SequenceGenerator(name="notice_sequence", sequenceName="SEQ_NOTICE")
    private Long id;

    @NotNull(message="Título não pode ser nulo.")
    @NotEmpty(message = "Título não pode ser vazio.")
    @Column(name = "TITLE")
    private String title;

    @NotNull(message="Descrição não pode ser nula.")
    @NotEmpty(message = "Descrição não pode ser vazia.")
    @Column(name = "DESCRIPTION")
    private String description;

    @NotNull(message="Data de publicacao não pode ser nula.")
    @Column(columnDefinition = "DATE", name="PUBLISH_DATE")
    private LocalDate publishDate;

    @Column(columnDefinition = "DATE", name="VISUALIZATION_DATE")
    private LocalDate visualizationDate;

    
}

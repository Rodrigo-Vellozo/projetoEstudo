package br.com.devmedia.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.devmedia.entity.Categoria;

public interface CategoriaRepository extends JpaRepository<Categoria, Long>{

}

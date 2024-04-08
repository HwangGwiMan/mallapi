package org.zerock.mallapi.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.jaxb.SpringDataJaxb.PageRequestDto;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.zerock.mallapi.dto.PageRequestDTO;
import org.zerock.mallapi.dto.PageResponseDTO;
import org.zerock.mallapi.dto.TodoDTO;
import org.zerock.mallapi.service.TodoService;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;





@RestController
@Log4j2
@RequiredArgsConstructor
@RequestMapping("/api/todo")
public class TodoController {
    
    @Autowired
    private final TodoService todoService;

    @GetMapping("/{tno}")
    public TodoDTO get(@PathVariable("tno") Long tno) {
        return todoService.get(tno);
    }
    
    @GetMapping("/list")
    public PageResponseDTO<TodoDTO> list(PageRequestDTO pageRequestDTO) {
        log.info("list.................." + pageRequestDTO);

        return todoService.getList(pageRequestDTO);
    }
    
    @PostMapping("/")
    public Map<String, Long> register(@RequestBody TodoDTO dto) {
        
        log.info("todoDTO : " + dto);

        Long tno = todoService.register(dto);
        
        return Map.of("TNO", tno);
    }
    
    @PutMapping("/{tno}")
    public Map<String, String> modify(@PathVariable("tno") Long tno, @RequestBody TodoDTO todoDTO) {
        
        todoDTO.setTno(tno);

        todoService.modify(todoDTO);
        
        return Map.of("RESULT", "SUCCESS");
    }

    @DeleteMapping("/{tno}")
    public Map<String, String> remove(@PathVariable Long tno) {
        todoService.remove(tno);

        return Map.of("RESULT", "SUCCESS");
    }

}

package com.main_032.SideQuest.member.controller;

import com.main_032.SideQuest.member.dto.*;
import com.main_032.SideQuest.member.service.MemberService;
import com.main_032.SideQuest.util.dto.SingleResponseDto;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Api(tags = {"Member"}, description = "멤버 API")
public class MemberController {

    private final MemberService memberService;

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @ApiOperation(value = "회원 가입") //회원가입
    @PostMapping("/signup")
    public ResponseEntity<Void> signup(@RequestBody MemberPostDto memberPostDto) {
        memberService.signup(memberPostDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // Swagger API 뽑아내기용 함수
    @ApiOperation(value = "로그인")
    @PostMapping("/login")
    @ResponseStatus(HttpStatus.OK)
    public LoginResponseDto login(@RequestBody LoginPostDto loginPostDto) {
        LoginResponseDto loginResponseDto = new LoginResponseDto("name");
        return loginResponseDto;
    }

    @ApiOperation(value = "로그인 멤버 정보 조회")
    @GetMapping("/member")
    public ResponseEntity<SingleResponseDto<GetMemberResponseDto>> getLoginMemberInfo() {
        SingleResponseDto<GetMemberResponseDto> singleResponseDto = memberService.getLoginMemberInfo();
        return new ResponseEntity<SingleResponseDto<GetMemberResponseDto>>(singleResponseDto, HttpStatus.OK);
    }

    @ApiOperation(value = "멤버 정보 수정")
    @PatchMapping("/member")
    public ResponseEntity<Void> updateMember(@RequestBody MemberPatchDto memberPatchDto) {
        memberService.updateMember(memberPatchDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
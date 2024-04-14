import { Controller, Get, Post, Body, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { CommentService } from './services/comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { AtGuard, GetCurrentUser } from 'src/common';
import { DeleteCommentDto, GetCommentsDto } from './dto';

@UseGuards(AtGuard)
@Controller('comments')
export class CommentController {
	constructor(private readonly commentService: CommentService) {}
	@Post()
	async CreateCommentDto(@GetCurrentUser() user: TUserJwt, @Body() dto: CreateCommentDto) {
		return this.commentService.createComment(user, dto);
	}

	@Get('/:id/children')
	async getCommentByParentId(@Param('id') parentId: string, @Query() query: GetCommentsDto) {
		return this.commentService.getCommentByParentId(parentId, query);
	}

	@Delete(':id')
	async deleteComment(@Param('id') id: string, @Body() dto: DeleteCommentDto) {
		return this.commentService.deleteComment(id, dto);
	}
}

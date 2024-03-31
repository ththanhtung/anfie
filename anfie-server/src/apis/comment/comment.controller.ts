import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { CommentService } from './services/comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { AtGuard, GetCurrentUser } from 'src/common';
import { DeleteCommentDto } from './dto';

@UseGuards(AtGuard)
@Controller('comments')
export class CommentController {
	constructor(private readonly commentService: CommentService) {}
	@Post()
	async CreateCommentDto(@GetCurrentUser() user: TUserJwt, @Body() dto: CreateCommentDto) {
		return this.commentService.createComment(user, dto);
	}

	@Get()
	async getCommentByParentId(@Param('parentId') parentId: string) {
		return this.commentService.getCommentByParentId(parentId);
	}

	@Delete(':id')
	async deleteComment(@Param('id') id: string, @Body() dto: DeleteCommentDto) {
		return this.commentService.deleteComment(id, dto);
	}
}

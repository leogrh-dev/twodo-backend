import { Injectable } from '@nestjs/common';
import { Note } from '../../entities/note.entity';
import { NoteRepository } from '../../../application/interfaces/note-repository.interface';

@Injectable()
export class UpdateNoteContentUseCase {
  constructor(private readonly noteRepository: NoteRepository) { }

  async execute(noteId: string, newContent: string, userId: string): Promise<Note> {
    const note = await this.noteRepository.findById(noteId);
    if (!note) throw new Error('Nota não encontrada');
    if (note.ownerId !== userId) throw new Error('Você não tem permissão');

    note.updateContent(newContent);
    note.attachedFiles = this.extractUrls(newContent);

    return this.noteRepository.update(note);
  }

  private extractUrls(content: string): string[] {
    try {
      const parsed = JSON.parse(content);
      const urls = new Set<string>();

      const traverse = (node: any) => {
        if (node?.props?.url && typeof node.props.url === 'string') {
          urls.add(node.props.url);
        }
        if (Array.isArray(node?.content)) {
          node.content.forEach(traverse);
        }
      };

      parsed.forEach(traverse);
      return [...urls];
    } catch {
      return [];
    }
  }
}
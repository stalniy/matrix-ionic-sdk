import { Component, State, h } from '@stencil/core';

interface Message {
  id: string
  content: string
  createdAt: string
  creatorId: string
  createdBy: User
}

interface User {
  fullName: string
  avatarUrl?: string
}

@Component({
  tag: 'mx-messages',
  styleUrl: 'mx-messages.css'
})
export class Messages {
  @State() messages: Message[] = [
    {
      id: '1',
      content: 'test',
      createdAt: new Date().toISOString(),
      creatorId: '2',
      createdBy: {
        fullName: 'John Doe',
      }
    }
  ]

  private client: any

  constructor() {
    this.client = matrixcs.createClient('http://matrix.org')
  }

  isDateVisibleAt(index) {
    return index === 0 || !this.isDateTheSameAt(index - 1, index)
  }

  isDateTheSameAt(index, nextIndex) {
    const message = this.messages[index]
    const nextMessage = this.messages[nextIndex]

    return !message || message.createdAt.slice(0, 10) === nextMessage.createdAt.slice(0, 10)
  }

  isLastUserMessageAt(index) {
    const message = this.messages[index]
    const nextMessage = this.messages[index + 1]

    return !nextMessage || message.creatorId !== nextMessage.creatorId
  }

  isMy(message) {
    return message.creatorId === '1'
  }

  classForMessage(message: Message, index) {
    return [
      this.isMy(message) ? 'message-sent' : 'message-received',
      this.isLastUserMessageAt(index) ? 'message-last' : ''
    ].join(' ').trim()
  }

  classForAuthor(author: User) {
    return author.avatarUrl ? 'has-avatar' : ''
  }

  styleForAuthor(author: User) {
    const styles: { backgroundImage?: string } = {}

    if (author.avatarUrl) {
      styles.backgroundImage = `url(${author.avatarUrl})`
    }

    return styles
  }

  async componentWillLoad() {
    // await this.client.login('m.login.password', {
    //   user: '',
    //   password: ''
    // })

    // this.client.startClient()
    // this.client.once('sync', () => {
    //   const [, room] = this.client.getRooms()

    //   console.log(room.getLiveTimeline().getEvents())
    // })
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Test chat</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content class="ion-padding mx-messages-wrapper">
        <div class="mx-messages-content">
          <div class="mx-messages">{this.renderMessages()}</div>
        </div>
      </ion-content>
    ];
  }

  renderMessages() {
    return this.messages.map((message, index) => [
      this.isDateVisibleAt(index) ? (
        <div class="messages-date">{message.createdAt}</div>
      ) : '',
      <div class={`message message-with-avatar ${this.classForMessage(message, index)}`}>
        {!this.isMy(message) ? (
          <div class="message-name">{message.createdBy.fullName}</div>
        ) : ''}
        <div class="message-text">
          <div class="message-body">{message.content}</div>
          <div class="message-date">{message.createdAt}</div>
        </div>
        {this.isLastUserMessageAt(index) ? [
          <div class={`message-avatar ${this.classForAuthor(message.createdBy)}`} style={this.styleForAuthor(message.createdBy)}>
            <ion-icon name="person"></ion-icon>
          </div>,
          message.id ? (<div class="message-label">Delivered</div>) : ''
        ] : ''}
      </div>
    ])
  }
}

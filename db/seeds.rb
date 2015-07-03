u1 = User.create(email: 'guest12345@gmail.com', password: 'password')
u2 = User.create(email: 'billybobby@gmail.com', password: 'password')
u3 = User.create(email: 'mynamesfido@gmail.com', password: 'password')
u4 = User.create(email: 'petergriffin@gmail.com', password: 'password')

b1 = u1.boards.create(title: 'Workout')
b2 = u1.boards.create(title: 'Tech')

l1 = b1.lists.create(title: 'todo')
l2 = b1.lists.create(title: 'doing')

c4 = l1.cards.create(title: 'hill-sprints', description: 'feel the burn')
c5 = l1.cards.create(title: 'good-mornings', description: 'ooh ouch')
c6 = l1.cards.create(title: 'plyometrics', description: 'ouchy')

c7 = l2.cards.create(title: 'squats', description: 'feel the burn')
c8 = l2.cards.create(title: 'bench press', description: 'ooh ouch')
c9 = l2.cards.create(title: 'deadlifts', description: 'ouchy')

i1 = c1.items.create(done: false, title: 'mocha')
i2 = c1.items.create(done: true, title: 'mocha')
i3 = c1.items.create(done: true, title: 'cookie')
#############
l3 = b2.lists.create(title: 'Ruby on Rails')
l4 = b2.lists.create(title: 'BackboneJS')
l5 = b2.lists.create(title: 'HTML/CSS')
l6 = b2.lists.create(title: 'jQuery')

c10 = l3.cards.create(title: 'MVC', description: 'model-view-controller')
c11 = l3.cards.create(title: 'CSRF', description: 'cross-site request forgery')
c12 = l4.cards.create(title: 'JavaScript', description: 'prototypal inheritance say what')
c13 = l4.cards.create(title: 'JSON', description: 'JavaScript Object Notation')
c14 = l5.cards.create(title: 'divs divs divs...', description: 'when to use?')
c15 = l5.cards.create(title: 'Cascading Style Sheets', description: 'style sheet language')
c16 = l6.cards.create(title: 'JavaScript library', description: '')
c17 = l6.cards.create(title: 'DOM', description: 'Document Object Model')

i4 = c10.items.create(done: false, title: 'mocha')
i5 = c10.items.create(done: true, title: 'mocha')
i6 = c11.items.create(done: true, title: 'cookie')
i7 = c11.items.create(done: true, title: 'cookie')
i8 = c12.items.create(done: false, title: 'mocha')
i9 = c12.items.create(done: true, title: 'mocha')
i10 = c13.items.create(done: true, title: 'cookie')
i11 = c14.items.create(done: true, title: 'vanilla')
i12 = c14.items.create(done: true, title: 'cookie')
i13 = c15.items.create(done: true, title: 'mocha')
i14 = c15.items.create(done: true, title: 'cookie')
i15 = c16.items.create(done: true, title: 'choco')


BoardMembership.create(user_id: 3, board_id: 1)
BoardMembership.create(user_id: 4, board_id: 1)
BoardMembership.create(user_id: 2, board_id: 2)
BoardMembership.create(user_id: 4, board_id: 2)



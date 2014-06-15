Angular Hogwarts TDD Kata
=========================

Introduction
------------

Hogwarts has embraced Muggle Technology!

Professor Arthur Weasley has just invented the first steam powered computer and it works at Hogwarts.

---

Young Wizard, you will be creating Hogwart's online student registration. Professor Neville Longbottom will guide you.

Because you are a highly disciplined Wizard, you will be writing your code test first.

Setup
-----

``git clone https://github.com/jmcooper/angular-hogwarts-tdd-kata.git``

``cd angular-hogwarts-tdd-kata``

You have two ways of running through this kata:
  1. Using the ``Express.js`` webserver and the Karma test runner inside Chrome.
  2. Using plain files inside Firefox.


### Karma, Express.js inside Chrome (preferred)

You have [node](http://nodejs.org/) installed. To install ``express.js`` and ``karma`` from the command line run

``npm install``

(or just copy the ``node_modules`` directory and run ``npm rebuild``)

To run the server, call

``node server.js``

You will load the app and test page with the following:

 - [http://localhost:4567/app](http://localhost:4567/app)
 - [http://localhost:4567/test](http://localhost:4567/test)


Finally, if you like your tests automatically running every time you make a change, use the following command:

``./node_modules/karma/bin/karma start``


### Working with Plain Files in Firefox

You will have two files loaded into Firefox:

  ``file://.../app/index.html``

  ``file://.../ test/HogwartsTests.hmtl``

You will not edit either of these files.

Story: Show Course Catalog
--------------------------

Acceptance: Students will be able to see a catalog of courses.

---

How will you start, my young wizard friend? **By making changes to catalog UI inside file ``app/catalog/catalog.html``.**

How will you view it? **I will refresh ``app/index.html`` and click on the Catalog tab.**


### UI For Course Catalog

``app/catalog/catalog.html``
```html
...
            <tbody>
                <tr ng-repeat="course in catalog">
                    <td>{{course.name}}</td>
                    <td>{{course.startTime | date: 'h:mm a'}}</td>
                    <td>{{course.professor}}</td>
                    <td>{{course.credits}}</td>
                </tr>

```

I see you expect to have a ``catalog`` array on the ``CatalogController`` scope. **Yes.**

I reloaded ``app/index.html`` and clicked on menu item catalog and I don't see anything. **It is because we haven't hooked it up.**

How will you hook it up? **By loading the ``scope`` with all the courses when the Controller is initialized.**

### Test 1: Make it Error

Can you show me what you mean? **Sure. Here is the core of the test.**

``test/catalog/catalog-controller-specs.js``
```js

describe('CatalogController', function () {

    describe('when the controller first loads', function () {

        it('the course catalog is retrieved', function () {
            sinon.assert.calledOnce(mockCatalogRepository.getCatalog);
        });

    });

});
```

Very nice, you wrote the description and the expectation first. **Thank you. Keeping the test simple helps my thinking.**

What happens if you run it? **It will generate errors. You can see them by reloading your tests (``test/HogwartsTests.hmtl`` in browser or looking at your CLI karma results).**

What is the meaning of: "mockCatalogRepository is not defined"? **It means my mockCatalogRepository is not setup -- I'm referencing it in my test before I even declare it.**

### Test 1: Make it Fail

What's the first step? **Declare the mockCatalogRepository.**

Yes, and then? **I'm not sure.**

Do you remember how to cast the Dependency Injection spell? **I remember now.**


``test/catalog/catalog-controller-specs.js``
```js
...
describe('CatalogController', function () {

    var mockCatalogRepository,
        scope,
        catalog = ["catalog"];

    beforeEach(function () {
        module("hogwartsApp");

        inject(function ($rootScope, $controller, CatalogRepository) {
            scope = $rootScope.$new();

            mockCatalogRepository = sinon.stub(CatalogRepository);
            mockCatalogRepository.getCatalog.returns(catalog);

            $controller("CatalogController", {
                $scope: scope,
                CatalogRepository: mockCatalogRepository
            });
        });
    });

    describe('when the controller first loads', function () {
...
```

Does it pass now? **No, but it is not erroring. I think we are making progress? We are seeing a failing test (expected getCatalog to be called once but was called 0 times).**

You are on the path to enlightenment. It is wise to celebrate your failures, young wizard. **Yeah!???**

What are you doing inside ``beforeEach``? **We are creating a mock repository and a temporary scope. We then inject the mocks into the ``CatalogController``.**

### Test 1: Make it Pass

How do you make it pass? **The test says the CatalogController needs to call getCatalog on the repository when CatalogController is initialized.**


``app/catalog/catalog-controller.js``
```js

'use strict';

hogwartsApp
.controller("CatalogController", [ '$scope',
                                    'CatalogRepository',
                                    function ($scope, catalogRepository) {
    catalogRepository.getCatalog();
}]);
```

Is it passing? **Yes!**

### Test 1: Refactor it

Whenever your tests are passing, you might consider refactoring. **I don't see anything that needs refactoring.**

### Test 2: Failing

You have completed your first test. One point for Hufflepuff. Is the story complete? **No, the catalog does not show up on the web page. The ``catalog.html`` UI expects an property called ``catalog`` on the scope. I can do that!**

Ahem. You can write a test for that? **Oh, yes, that's what I meant.**

``test/catalog/catalog-controller-specs.js``
```js

...
    describe('when the controller first loads', function () {

        ...

        it('should put the catalog on the scope', function() {
            expect(scope.catalog).toEqual(catalog)
        });

        ...
```

### Test 2: Passing

``catalog/catalog-controller.js``
```js

...
.controller("CatalogController", ['$scope',
                                  'CatalogRepository',
                                  function ($scope, catalogRepository) {
    $scope.catalog = catalogRepository.getCatalog();
}]);
```

Are we finished with the story? **No, Professor Longbottom. Before calling a story done, it must be tested and deployed.**

But this is only a Kata, we will start on the real work next week when you have a pair. **Ok, I won't deploy it and I won't write automated tests. But I must inspect my beautiful work (and make sure it is working).**

You can see it by loading ``app/index.html`` into your browser and clicking on Catalog (at the top). **I am seeing the page now.**

Well done, young Wizard. You have finished your story. Another point for Hufflepuff. **Thank you, I like the write the test, see it fail, write code to make it pass, and then refactor rhythm. I also like seeing what the end user sees.**

Story: Register for Courses
---------------------------

Acceptance: Students register in course catalog then view their courses in schedule.

---

### UI for Registration

You have shown us how to test getting from a repository and displaying the results. I would like to see some interaction. **Sure, how about a link called register on the catalog page.**

That works for now. **Here is the updated catalog.html**

``app/catalog/catalog.html``
```html

...
                <tr ng-repeat="course in catalog">
                    ...

                    <td>
                        <a href="javascript:void(0);" ng-click="register(course.id)">
                            Register
                        </a>
                    </td>
                </tr>
```

We need a place to see the registered courses. **Someone else already put it inside ``wizard/schedule.html``**

Hmm, I am seeing duplication between the your course catalog and their schedule. **Yes, I will take care of that later with a ``ng-include``.**

OK. Where do you want to start? **In the course catalog controller of course.**

### Test 1: Failing
Don't you mean the course catalog controller spec. **Yes, Professor; this is a TDD Kata, after all.**

``test/catalog/catalog-controller-specs.js``
```js

...

    var mockCatalogRepository,

        mockRegistrationService,

      ...

        inject(function ( ... , RegistrationService) {
            ...

            mockRegistrationService = sinon.stub(RegistrationService);

            ...

            $controller("CatalogController", {
                ... ,
                RegistrationService: mockRegistrationService
            });
	
	  ...
	
    describe('when registering for a course', function() {
        var courseId = 'courseId';
        var response = {success: true, message: ''};

        it('adds the course to the wizard\'s schedule', function() {
            mockRegistrationService.register.returns(response);
            scope.register(courseId);
            sinon.assert.calledWith(mockRegistrationService.register, courseId);
        });

    });

});
```

You have done amazing work. You added a ``mockRegistrationService
`` and stubbed it at the top level. You have mocked it inside a new ``describe`` block and written a test that says we are delegating the add course to the ``RegistrationService``. **Thank you. But when I run the tests, I get an error.**

Yes, it's a tricky spell, isn't it? **Yes. I think I need to define the ``register`` method on the ``RegistrationService`` in the ``wizard`` directory so the mocking framework knows how to stub it.**

``app/wizard/registration-service.js``
```js
hogwartsApp
.factory('RegistrationService', [ function() {
    return {
        register: function(courseId) {
        }
    };
}]);

```

Very good, you're almost there. **My error now says "scope.register is not a function". Oh, duh, I need to implement the function register() in the CatalogController.**

Professional Wizards do not normally say 'Duh.' **Yes, Professor. I mean, No, Professor.**

### Test 1: Passing

In order to do that you will need to? **Um... I need to inject the ``RegistrationService`` into the the ``CatalogController`` so that I can call it.**

``app/catalog/catalog-controller.js``
```js

...

.controller("CatalogController", [ ...
                                   'RegistrationService',
                                   function ( ... , registrationService) {

    ...

    $scope.register = function(courseId) {
        registrationService.register(courseId);
    };

}]);
```

### Test 2: Failing

Very good, you remembered to run the tests again. **Yes, it worked!**

Next we need to show the student the result of their registration attempt. **I will put the ``RegistrationService`` response on the scope so the UI can access it.**

``test/catalog/catalog-controller-specs.js``
```js

...

    describe('when registering for a course', function() {

        ...

        it('adds the registration response to the scope', function() {
            mockRegistrationService.register.returns(response);
            scope.register(courseId);
            expect(scope.response).toEqual(response);
        });

    ...

```

### Test 2: Passing

And to get it passing... **That is as simple as adding ``$scope.response = ``**

``app/catalog/catalog-controller.js``
```js

...

        $scope.register = function(courseId) {
            $scope.response = registrationService.register(courseId);
```

### Test 2: Refactor
I smell duplication in the test. **Yes and I am willing to remove it, while all my tests are passing. I am adding a ``beforeEach`` right now and removing the duplication.**


``test/catalog/catalog-controller-specs.js``
```js

...

    describe('when registering for a course', function() {

        ...

        beforeEach(function() {
            mockRegistrationService.register.returns(response);
            scope.register(courseId);
        });

        it('adds the course to the wizard\'s schedule', function() {
            sinon.assert.calledWith(mockRegistrationService.register, courseId);
        });

        it('adds the registration response to the scope', function() {
            expect(scope.response).toEqual(response);
        });
    });
```

Are your tests still passing? **Yes.**

Are you finished with this story? **No. We are delegating to the ``RegistrationService`` which we haven't written yet! Of course, I will write a test for ``RegistrationService`` first.**

### Test 3: Erroring

``test/wizard/registration-service-specs.js``
```js

describe('RegistrationService', function () {

    describe('when registering for a course', function () {
        var course = {id: 'Potions'};

        it ('saves the course to the WizardRepository', function() {
            registrationService.register(course.id);
            sinon.assert.calledWith(
                mockWizardRepository.save, {courses: {'Potions' : course}}
            );
        });

    });

    ...
```

You have a test that clearly states your intent: registering leads to a new course in the ``WizardRepository``. **Yes but it won't run until I use the Dependency Injection spell again.**

### Test 3: Failing

Looking at your test, you obviously need a ``mockWizardRepository`` that has a ``save`` method. But how are you going to convert ``course.id`` into a ``course``?  **I am going to get all the courses from the ``CatalogRepository`` and then iterate over them until I find the one I want.**

That would have the code smell: _Inappropriate intimacy_. Can you think of another way? **Oops, I just missed the method ``getCourse(courseId)`` on the ``CatalogRepository``. I will call that one instead.**

**Notice registration service tests are in the ``wizard`` directory.**

``test/wizard/registration-service-spec.js``
```js

describe('RegistrationService', function () {

    var registrationService,
        mockCatalogRepository,
        mockWizardRepository;

    beforeEach(function () {
        module("hogwartsApp");

        inject(function (RegistrationService, CatalogRepository, WizardRepository) {
            registrationService = RegistrationService;
            mockCatalogRepository = sinon.stub(CatalogRepository);
            mockWizardRepository = sinon.stub(WizardRepository);
        });
    });

    describe('when registering for a course', function () {
        ...

        beforeEach(function() {
            mockCatalogRepository.getCourse.returns(course);
            mockWizardRepository.get.returns({courses: {}});
        });

        ...
```

### Test 3: Passing

``app/wizard/registration-service.js``
```js
hogwartsApp
.factory('RegistrationService', [ 'CatalogRepository',
                                  'WizardRepository',
                                  function(catalogRepository, wizardRepository) {
    return {
        register: function(courseId) {
            var course = catalogRepository.getCourse(courseId),
                wizard = wizardRepository.get();

            wizard.courses[course.id] = course;
            wizardRepository.save(wizard);
        }
    };

}]);

```

### Test 3: Refactor

What does the last two lines register? **It registers the wizard for the course.**

Can you clarify it in code? **You mean extract the last 2 lines into a method.** Yes.

``app/wizard/registration-service.js``
```js

...

        register: function(courseId) {
            var course = catalogRepository.getCourse(courseId),
            wizard = wizardRepository.get();

            registerWizardForCourse(wizard, course);
        }
    };

    function registerWizardForCourse(wizard, course) {
        wizard.courses[course.id] = course;
        wizardRepository.save(wizard);
    }

...
```

### Test 4: Failing

A service should always return a response. **You mean something like this?**

``test/wizard/registration-service-spec.js``
```js

...

    describe('when registering for a course', function () {

        ...

        it('should return a success response', function () {
            var response = registrationService.register(course.id);
            expect(response.success).toBeTruthy();
        });

    ...
```

Exactly!

### Test 4: Passing

``app/wizard/registration-service.js``
```js
...

        register: function(courseId) {
            ...

            return registerWizardForCourse(wizard, course);

    ...

    function registerWizardForCourse(wizard, course) {
        ...

        return {success: true};
    }

...
```

### Test 5: Failing

How will the student know if they are really registered? **They will see their courses on the schedule page.**

How will they see their courses on the schedule page? **Hmm, let's see. The schedule.html is already written. It looks like it expects a wizard object on the scope. The ``wizard`` has ``courses``.**

You are indeed a very promising young wizard. **I will write tests for the schedule controller. I'm writing both tests because the code to pass them is one line.**

``test/wizard/schedule-controller-spec.js``
```js
describe('ScheduleController', function () {
    var scope, mockWizardRepository;
    var wizard = {courses: {'foo': {id: 'foo'}}};

    beforeEach(function () {
        module("hogwartsApp");

        inject(function ($rootScope, $controller, WizardRepository) {
            scope = $rootScope.$new();

            mockWizardRepository = sinon.stub(WizardRepository);
            mockWizardRepository.get.returns(wizard);

            $controller("ScheduleController", {
                $scope: scope,
                WizardRepository: mockWizardRepository
            });
        });
    });

    describe('when the controller first loads', function () {
        it('gets the wizard from the repository', function () {
            sinon.assert.calledOnce(mockWizardRepository.get);
        });

        it('puts wizard on the scope', function() {
            expect(scope.wizard).toEqual(wizard)
        });
    });
});

```

### Test 5: Passing

You can make the tests pass? **Yes, this is less painful than drinking a Polyjuice Potion:**

``app/wizard/schedule-controller.js``
```js
hogwartsApp
.controller("ScheduleController", [ '$scope',
                                    'WizardRepository',
                                    function ($scope, wizardRepository) {
    $scope.wizard = wizardRepository.get();
}]);
```

### Test 5: End to End

How are we going to end to end test it? **I will click the register link and notice a message saying it was successful. Then I'll look at the schedule page and see the course I just registered for.**

Are we finished with this story? **It depends, do we have a story disallowing scheduling mutiple course at the same time (with the exception of students using a Time-Turner)?**

Yes that is another story. **Then, the software works as expected. The code is clean. Yes, I would say this story is done.**

Congratulations, two points for Hufflepuff. Now, it is for a Quidditch match.

Story: Hat Sorts Randomly
-------------------------

Acceptance: Clicking multiple times will result in all houses being selected.

---

We have a disaster, a crisis of epic proportion! Sorting Hat is on an extended vacation with Nymphadora Tonks' ghost. The replacement, the old straw thing that sorted you, is sorting everything according to this Kata! **I am not sure I see the problem.**

Everyone is being sorted into _Hufflepuff_! **Oh, no!, I could have been in Gryffindor! What can we do?**

We must change the Kata immediately to sort randomly.  **I am on it.**

### Debugging

How will you find the bug? **Open the debugger on ``index.html#/sorting``, set a break point inside ``sorting-hat-controller.js`` on ``$scope.sort`` and follow it down until I find the bug.**

You have tests, why not use them to help locate the bug? **I am not sure how.**

Take a look in the directories, ``app/sorting/`` and ``test/sorting/``. **Oh, I see we have no corresponding test file for ``random-number-service.js`` that is probably the bug location.**

Sometime, you might have a test file but the test is missing. Code coverage can also help you find missing tests. **Good to know. Something is fishy with ``Math.floor(Math.random() * (max - max)) + max;``**

You now have a choice, _write a test_ or open the _debugger_. **I choose test (this is a TDD Kata after all).**

### Test Random

**I will create the file ``test/sorting/random-number-service-specs.js`` with the following tests in it.**

``test/sorting/random-number-service-specs.js``
```js
describe('RandomNumberService', function () {
    var randomNumberService;
    var stubMath;

    beforeEach(function () {
        module("hogwartsApp");
        stubMath = sinon.stub(Math, 'random');
        inject(function (RandomNumberService) {
            randomNumberService = RandomNumberService;
        });
    });

    afterEach(function () {
        stubMath.restore();
    });

    describe('when generating a random number in range 0 - 3', function () {

        it ('returns 0 for random range 0.0 - 0.249', function() {
            stubMath.returns(0.249);
            expect(randomNumberService.getInRange(0, 3)).toEqual(0);
        });

        it ('returns 1 for random range 0.25 - 0.49', function() {
            stubMath.returns(0.49);
            expect(randomNumberService.getInRange(0, 3)).toEqual(1);
        });

        it ('returns 2 for random range 0.5 - 0.749', function() {
            stubMath.returns(0.749);
            expect(randomNumberService.getInRange(0, 3)).toEqual(2);
        });

        it ('returns 3 for random range 0.75 - 1', function() {
            stubMath.returns(0.99);
            expect(randomNumberService.getInRange(0, 3)).toEqual(3);
        });

    });

});
```

Nice work with the test coverage. **Thank you, Professor.**

### Test Passing

**To get it to pass, I replace the ``return`` section with the correct algorithm (straight from Arithmancy class).**

``app/sorting/random-number-service.js``
```js
...

            return Math.floor(Math.random() * (max - min + 1)) + min;

...
```

### End to End Testing

Have you looked at the website? **Yes students are now being sorted into different houses.**

Execelent! Three points for Hufflepuff.

O.W.L.s and N.E.W.T.s
=====================

The Kata is officially over. If you are here with working code, you are awarded an _Acceptable_ OWL. If you want a NEWT or a higher grade, complete some or all of the following stories/tasks.

### Disallow Registering for Multiple Simultaneous Classes

Acceptance: Students attempting to register for multiple classes at the same time will be shown a message saying this is not allowed and the second class will not be added to their schedule.

### Allow Multiple Simultaneous Classes with  a Time-Turner

Acceptance: Students with a time-turner will be allowed to register for multiple classes at the same time.

### Refactor out the duplicated UI in Schedule and Catalog

Using ``ng-include`` remove duplication between

``wizard/schedule.html`` and ``catalog/catalog.html``

### Modify this Kata to Use a Todo List

TDD give you
 - a know starting point (what is the test for that?)
 - the ability to focus on a small piece of a bigger problem
 - feedback that your changes haven't broken something

As you work confidently on you little solution, you need a place to store your alternative solutions, other problems and things you are going to do later to eliminate being distracted by them.

This is often in your journal in a Todo list.

Add the use of the Todo list into this kata.

### Add Automated Acceptance Tests

When you favor mockist style TDD, you need automated Acceptance Tests.

Write at least one end to end [Protractor](https://github.com/angular/protractor) test for each story you implemented.

---

Thank you!

<a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/"><img alt="Creative Commons License" style="border-width:0" src="http://i.creativecommons.org/l/by-nc/4.0/88x31.png" />

